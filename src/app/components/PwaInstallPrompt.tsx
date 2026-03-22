import { useCallback, useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../context/ThemeContext';

/** Short delay after load so the UI can settle first. */
const SHOW_AFTER_MS = 8_000;

/** Set when the user has installed this PWA once (any method); hides the banner in normal browser tabs too. */
const MARK_INSTALLED_KEY = 'fuelalert-pwa-user-has-installed';

const INSTALLED_DISPLAY_MODES = [
  '(display-mode: standalone)',
  '(display-mode: fullscreen)',
  '(display-mode: minimal-ui)',
  '(display-mode: window-controls-overlay)',
] as const;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function readMarkedInstalled(): boolean {
  try {
    return localStorage.getItem(MARK_INSTALLED_KEY) === '1';
  } catch {
    return false;
  }
}

export function markUserHasInstalledPwa(): void {
  try {
    localStorage.setItem(MARK_INSTALLED_KEY, '1');
  } catch {
    /* ignore */
  }
}

/** True when the app is already open as an installed PWA (not a normal browser tab). */
export function isRunningAsInstalledPwa(): boolean {
  if (typeof window === 'undefined') return false;
  for (const q of INSTALLED_DISPLAY_MODES) {
    try {
      if (window.matchMedia(q).matches) return true;
    } catch {
      /* ignore unsupported queries */
    }
  }
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true;
}

/**
 * True if we should never show the install banner (standalone session, or user installed before on this browser).
 */
export function shouldSuppressInstallPrompt(): boolean {
  if (typeof window === 'undefined') return true;
  return isRunningAsInstalledPwa() || readMarkedInstalled();
}

function isMobileLayout(): boolean {
  return window.matchMedia('(max-width: 767px)').matches;
}

function isIos(): boolean {
  const ua = window.navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return true;
  return (
    navigator.platform === 'MacIntel' && (navigator.maxTouchPoints ?? 0) > 1
  );
}

type PwaInstallPromptImplProps = {
  onMarkedInstalled: () => void;
};

/**
 * Mobile-only install hint when the app is not installed (not standalone).
 * Shown again on every full page load; dismiss hides until refresh/navigation remount only.
 */
function PwaInstallPromptImpl({ onMarkedInstalled }: PwaInstallPromptImplProps) {
  const { theme, t } = useTheme();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [timerDone, setTimerDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [installing, setInstalling] = useState(false);
  /** Re-check when display mode can change without full reload (rare). */
  const [installed, setInstalled] = useState(() => isRunningAsInstalledPwa());

  useEffect(() => {
    const sync = () => setInstalled(isRunningAsInstalledPwa());
    const mqs = INSTALLED_DISPLAY_MODES.map((q) => window.matchMedia(q));
    mqs.forEach((mq) => mq.addEventListener('change', sync));
    return () => mqs.forEach((mq) => mq.removeEventListener('change', sync));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isMobileLayout() || installed) return;

    const id = window.setTimeout(() => setTimerDone(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(id);
  }, [installed]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onPrompt = (e: Event) => {
      if (!isMobileLayout() || shouldSuppressInstallPrompt()) return;
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  const onInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        onMarkedInstalled();
        setDismissed(true);
        setDeferredPrompt(null);
      }
    } catch {
      /* user cancelled or prompt failed */
    } finally {
      setInstalling(false);
    }
  };

  const eligible =
    !installed &&
    timerDone &&
    !dismissed &&
    isMobileLayout() &&
    !shouldSuppressInstallPrompt();

  if (!eligible) return null;

  /** Native install sheet (Chrome/Edge over HTTPS or localhost). */
  const showInstallButton = Boolean(deferredPrompt);
  /** iOS Safari has no beforeinstallprompt. */
  const showIosCopy = !deferredPrompt && isIos();
  /** Android over plain HTTP (e.g. LAN dev URL) or browsers that never fire the event. */
  const showMenuHint = !deferredPrompt && !isIos();

  const isDark = theme === 'dark';

  return (
    <div
      className="fixed inset-x-0 z-[5500] flex justify-center p-3 pointer-events-none bottom-[calc(5rem+env(safe-area-inset-bottom,0px))]"
      role="region"
      aria-label={t('pwa.a11yRegion')}
    >
      <div
        className={`pointer-events-auto flex w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300 rounded-2xl border shadow-lg ${
          isDark
            ? 'border-border bg-card/95 text-foreground backdrop-blur-md'
            : 'border-border/60 bg-background/95 text-foreground backdrop-blur-md shadow-black/10'
        }`}
      >
        <div className="flex flex-1 gap-3 p-3 sm:p-4">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
              isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
            }`}
            aria-hidden
          >
            <Download className="size-5" />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-sm font-semibold leading-tight">
              {showIosCopy ? t('pwa.titleIos') : t('pwa.title')}
            </p>
            {(showIosCopy || showMenuHint) && (
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                {showIosCopy ? t('pwa.iosHint') : t('pwa.androidMenuHint')}
              </p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {showInstallButton ? (
                <Button
                  type="button"
                  size="sm"
                  className="h-8"
                  disabled={installing}
                  onClick={() => void onInstall()}
                >
                  {t('pwa.install')}
                </Button>
              ) : null}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-muted-foreground"
                onClick={dismiss}
              >
                {t('pwa.later')}
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className={`shrink-0 rounded-lg p-1.5 transition-colors ${
              isDark
                ? 'text-muted-foreground hover:bg-accent hover:text-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
            aria-label={t('pwa.close')}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hides the install prompt when the PWA is open as installed, or after the user has installed once
 * on this browser (so opening the site in a normal tab does not show the popup again).
 */
export function PwaInstallPrompt() {
  const [, setInstallRevision] = useState(0);

  const onMarkedInstalled = useCallback(() => {
    markUserHasInstalledPwa();
    setInstallRevision((n) => n + 1);
  }, []);

  useEffect(() => {
    const onAppInstalled = () => {
      markUserHasInstalledPwa();
      setInstallRevision((n) => n + 1);
    };
    window.addEventListener('appinstalled', onAppInstalled);
    return () => window.removeEventListener('appinstalled', onAppInstalled);
  }, []);

  if (typeof window === 'undefined') return null;
  if (shouldSuppressInstallPrompt()) return null;

  return <PwaInstallPromptImpl onMarkedInstalled={onMarkedInstalled} />;
}
