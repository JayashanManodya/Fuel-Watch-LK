import { useEffect, useState } from 'react';
import {
  getWatchedStations,
  WATCH_CHANGED_EVENT,
  type WatchedStation,
} from '../services/stationWatchStorage';

export function useStationWatchList(): WatchedStation[] {
  const [list, setList] = useState<WatchedStation[]>(getWatchedStations);

  useEffect(() => {
    const sync = () => setList(getWatchedStations());
    window.addEventListener(WATCH_CHANGED_EVENT, sync);
    return () => window.removeEventListener(WATCH_CHANGED_EVENT, sync);
  }, []);

  return list;
}
