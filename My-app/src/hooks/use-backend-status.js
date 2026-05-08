import { useEffect, useState } from 'react';

const subscribers = new Set();
let status = 'unknown';

export function getBackendStatus() {
  return status;
}

export function setBackendStatus(next) {
  if (status === next) return;
  status = next;
  subscribers.forEach((fn) => fn(status));
}

export function isBackendOffline() {
  return status === 'offline';
}

export function useBackendStatus() {
  const [s, setS] = useState(status);
  useEffect(() => {
    subscribers.add(setS);
    setS(status);
    return () => {
      subscribers.delete(setS);
    };
  }, []);
  return s;
}
