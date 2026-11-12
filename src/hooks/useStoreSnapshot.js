"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const DEFAULT_EVENTS = ["shopeasy_sync"];

export function useStoreSnapshot(
  readSnapshot,
  fallbackSnapshot,
  eventNames = DEFAULT_EVENTS
) {
  const eventKey = eventNames.join("\u0000");
  const serializedFallback = JSON.stringify(fallbackSnapshot);

  const subscribe = useCallback(
    (onStoreChange) => {
      if (typeof window === "undefined" || !eventKey) {
        return () => {};
      }

      const events = eventKey.split("\u0000");
      events.forEach((eventName) =>
        window.addEventListener(eventName, onStoreChange)
      );

      return () => {
        events.forEach((eventName) =>
          window.removeEventListener(eventName, onStoreChange)
        );
      };
    },
    [eventKey]
  );

  const serializedSnapshot = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(readSnapshot()),
    () => serializedFallback
  );

  return useMemo(
    () => JSON.parse(serializedSnapshot),
    [serializedSnapshot]
  );
}
