import { translations } from '../data/translations';
import type { Language } from '../types';

const MAX_BODY_CHARS = 520;

function tr(lang: Language, key: string): string {
  return translations[lang][key] ?? translations.en[key] ?? key;
}

export function getWatchNotifLang(): Language {
  if (typeof window === 'undefined') return 'en';
  const s = localStorage.getItem('fuel-alert-lang');
  if (s === 'si' || s === 'ta' || s === 'en') return s;
  return 'en';
}

function statusToLabel(lang: Language, status: string): string | null {
  if (status === 'not-available') return null;
  if (status === 'available') return tr(lang, 'status.available');
  if (status === 'limited') return tr(lang, 'status.limited');
  if (status === 'out-of-stock') return tr(lang, 'status.out-of-stock');
  return status;
}

const FUEL_FIELDS = [
  { field: 'petrol92', labelKey: 'fuel.petrol92' },
  { field: 'petrol95', labelKey: 'fuel.petrol95' },
  { field: 'autoDiesel', labelKey: 'fuel.diesel' },
  { field: 'superDiesel', labelKey: 'fuel.superDiesel' },
  { field: 'kerosene', labelKey: 'fuel.kerosene' },
] as const;

/** Single-fuel sentence: "Petrol 92 is Limited" (en) or "පෙට්‍රල් 92: සීමිතයි" (si/ta). */
function fuelSegmentSentence(lang: Language, fuelLabel: string, statusLabel: string): string {
  const mid = tr(lang, 'notify.is').trim();
  if (mid) return `${fuelLabel} ${mid} ${statusLabel}`;
  return `${fuelLabel}: ${statusLabel}`;
}

/** Multi-fuel list item: always short "Label: Status" (readable with semicolons). */
function fuelSegmentCompact(fuelLabel: string, statusLabel: string): string {
  return `${fuelLabel}: ${statusLabel}`;
}

/**
 * Single fuel: "{station}: Community reported {fuel} is {status} by {reporter}."
 * Several fuels: "{station}: Community report from {reporter} — P92: …; P95: …"
 */
export function buildWatchNotificationBody(
  lang: Language,
  stationLabel: string,
  raw: Record<string, unknown>
): string {
  const userRaw = raw.userName;
  const userName =
    typeof userRaw === 'string' && userRaw.trim().length > 0
      ? userRaw.trim()
      : tr(lang, 'notify.anonymousReporter');

  const sentenceParts: string[] = [];
  const compactParts: string[] = [];
  for (const { field, labelKey } of FUEL_FIELDS) {
    const v = raw[field];
    if (typeof v !== 'string' || !v) continue;
    const sl = statusToLabel(lang, v);
    if (!sl) continue;
    const label = tr(lang, labelKey);
    sentenceParts.push(fuelSegmentSentence(lang, label, sl));
    compactParts.push(fuelSegmentCompact(label, sl));
  }

  const reported = tr(lang, 'notify.communityReported');
  const byWord = tr(lang, 'notify.by');
  const multiFrom = tr(lang, 'notify.multiFrom');

  let line1: string;

  if (sentenceParts.length > 1) {
    const list = compactParts.join('; ');
    if (lang === 'en') {
      line1 = `${stationLabel}: ${multiFrom} ${userName} — ${list}.`;
    } else {
      line1 = `${stationLabel}: ${userName} ${byWord} — ${list}.`;
    }
  } else {
    let single: string;
    if (sentenceParts.length === 1) {
      single = sentenceParts[0];
    } else {
      const overall = raw.status;
      const ol =
        typeof overall === 'string' && overall.length > 0
          ? statusToLabel(lang, overall)
          : null;
      if (ol) {
        single = fuelSegmentSentence(lang, tr(lang, 'notify.overall'), ol);
      } else {
        single = fuelSegmentSentence(
          lang,
          tr(lang, 'notify.overall'),
          tr(lang, 'status.unknown')
        );
      }
    }
    line1 =
      lang === 'en'
        ? `${stationLabel}: ${reported} ${single} ${byWord} ${userName}.`
        : `${stationLabel}: ${reported} ${single} ${userName} ${byWord}.`;
  }

  const msgRaw = raw.message;
  const msg = typeof msgRaw === 'string' ? msgRaw.trim() : '';
  let body = msg.length > 0 ? `${line1}\n\n${msg}` : line1;

  if (body.length > MAX_BODY_CHARS) {
    body = `${body.slice(0, MAX_BODY_CHARS - 1)}…`;
  }
  return body;
}
