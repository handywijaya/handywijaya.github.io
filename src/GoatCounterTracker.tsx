import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * HashRouter keeps routes in the fragment; GoatCounter's default path ignores the hash
 * and only records the initial load. Send an explicit path on every client-side navigation.
 */
export default function GoatCounterTracker() {
  const location = useLocation();

  useEffect(() => {
    const path =
      `${location.pathname}${location.search}` === ''
        ? '/'
        : `${location.pathname}${location.search}`;

    const send = () => {
      const gc = window.goatcounter;
      if (gc && typeof gc.count === 'function') {
        gc.count({ path });
        return true;
      }
      return false;
    };

    if (send()) return undefined;

    const intervalId = window.setInterval(() => {
      if (send()) window.clearInterval(intervalId);
    }, 50);

    return () => window.clearInterval(intervalId);
  }, [location]);

  return null;
}
