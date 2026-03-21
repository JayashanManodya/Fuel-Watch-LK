import { API_BASE } from './api';
import { setLastSeenUpdateId } from './stationWatchStorage';

/** After subscribing, set cursor to latest report so old data does not trigger a notification. */
export async function seedLastSeenFromServer(stationId: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/stations/${stationId}/updates`);
    if (!res.ok) return;
    const arr: unknown = await res.json();
    if (!Array.isArray(arr) || arr.length === 0) {
      setLastSeenUpdateId(stationId, 0);
      return;
    }
    const latestId = Number((arr[0] as { id?: unknown }).id);
    setLastSeenUpdateId(stationId, Number.isFinite(latestId) ? latestId : 0);
  } catch {
    /* ignore */
  }
}
