import { useEffect } from 'react';
import { translations } from '../data/translations';
import { API_BASE } from '../services/api';
import { isPositiveFuelReport } from '../services/stationAvailability';
import {
  getLastSeenUpdateIds,
  getWatchedStations,
  setLastSeenUpdateId,
} from '../services/stationWatchStorage';
import { buildWatchNotificationBody, getWatchNotifLang } from '../services/watchNotificationFormat';
import { showWebNotification } from '../utils/showWebNotification';

const POLL_MS = 45_000;

/**
 * Polls watched stations while the app tab is open; shows a system notification
 * when a newer community report indicates fuel is available or limited.
 */
export function StationWatchNotifier() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    const tick = async () => {
      if (Notification.permission !== 'granted') return;
      const watched = getWatchedStations();
      if (watched.length === 0) return;

      const lastSeen = getLastSeenUpdateIds();

      for (const { id, name } of watched) {
        try {
          const res = await fetch(`${API_BASE}/stations/${id}/updates`);
          if (!res.ok) continue;
          const arr: unknown = await res.json();
          if (!Array.isArray(arr) || arr.length === 0) continue;

          const latest = arr[0] as Record<string, unknown>;
          const latestId = Number(latest.id);
          if (!Number.isFinite(latestId)) continue;

          const prev = lastSeen[id] ?? 0;
          if (latestId <= prev) continue;

          if (isPositiveFuelReport(latest)) {
            setLastSeenUpdateId(id, latestId);
            const lang = getWatchNotifLang();
            const title =
              translations[lang]['app.title'] ?? translations.en['app.title'];
            const label = name?.trim() || `Station #${id}`;
            const body = buildWatchNotificationBody(lang, label, latest);
            await showWebNotification(title, {
              body,
              tag: `fuelwatch-${id}-${latestId}`,
            });
          } else {
            setLastSeenUpdateId(id, latestId);
          }
        } catch {
          /* ignore network errors */
        }
      }
    };

    void tick();
    const intervalId = setInterval(tick, POLL_MS);

    const onVisible = () => {
      if (document.visibilityState === 'visible') void tick();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return null;
}
