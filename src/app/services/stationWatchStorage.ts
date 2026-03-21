export const WATCH_CHANGED_EVENT = 'fuelwatch:watched-changed';

const WATCH_KEY = 'fuelwatch:watched-stations';
const LAST_SEEN_KEY = 'fuelwatch:last-seen-update-id';

export type WatchedStation = { id: string; name: string };

function emitWatchChanged() {
  window.dispatchEvent(new Event(WATCH_CHANGED_EVENT));
}

export function getWatchedStations(): WatchedStation[] {
  try {
    const raw = localStorage.getItem(WATCH_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is WatchedStation =>
        x && typeof x === 'object' && typeof (x as WatchedStation).id === 'string'
    );
  } catch {
    return [];
  }
}

function setWatchedStations(list: WatchedStation[]) {
  localStorage.setItem(WATCH_KEY, JSON.stringify(list));
  emitWatchChanged();
}

export function isWatchedStation(stationId: string): boolean {
  return getWatchedStations().some((s) => s.id === stationId);
}

export function addWatchedStation(entry: WatchedStation) {
  const list = getWatchedStations().filter((s) => s.id !== entry.id);
  list.push({ id: entry.id, name: entry.name });
  setWatchedStations(list);
}

export function removeWatchedStation(stationId: string) {
  setWatchedStations(getWatchedStations().filter((s) => s.id !== stationId));
}

export function getLastSeenUpdateIds(): Record<string, number> {
  try {
    const raw = localStorage.getItem(LAST_SEEN_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function setLastSeenUpdateId(stationId: string, updateId: number) {
  const map = { ...getLastSeenUpdateIds(), [stationId]: updateId };
  localStorage.setItem(LAST_SEEN_KEY, JSON.stringify(map));
}
