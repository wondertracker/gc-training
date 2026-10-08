"use client";
import { useCallback, useSyncExternalStore } from "react";
const unavailable = "__gc_storage_unavailable__";
const subscribe = (listener: () => void) => {
  window.addEventListener("storage", listener);
  window.addEventListener("gc-storage", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("gc-storage", listener);
  };
};
const emptySubscribe = () => () => {};
export function useBrowserReady() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
export function useStoredString(key: string) {
  const ready = useBrowserReady();
  const snapshot = useCallback(() => {
    try {
      return localStorage.getItem(key);
    } catch {
      return unavailable;
    }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, snapshot, () => null);
  const write = (value: string) => {
    try {
      localStorage.setItem(key, value);
      window.dispatchEvent(new Event("gc-storage"));
      return true;
    } catch {
      return false;
    }
  };
  return {
    raw: raw === unavailable ? null : raw,
    available: raw !== unavailable,
    ready,
    write,
  };
}
