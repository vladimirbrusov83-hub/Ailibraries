"use client";

import { useCallback, useEffect, useState } from "react";

// The browser's own install window (Chrome, Edge, Samsung Internet). The inline head script
// catches the event early and keeps it on window.__ailInstall until our button uses it.
type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

declare global {
  interface Window {
    __ailInstall?: PromptEvent | null;
  }
}

export function useInstallPrompt() {
  const [available, setAvailable] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    const sync = () => setAvailable(Boolean(window.__ailInstall));
    const installed = () => {
      setAvailable(false);
      setJustInstalled(true);
    };
    sync();
    window.addEventListener("ail-install-ready", sync);
    window.addEventListener("ail-installed", installed);
    return () => {
      window.removeEventListener("ail-install-ready", sync);
      window.removeEventListener("ail-installed", installed);
    };
  }, []);

  // Must be called from a tap or click. The event can only be used once.
  const prompt = useCallback(async (): Promise<"accepted" | "dismissed" | "unavailable"> => {
    const e = window.__ailInstall;
    if (!e) return "unavailable";
    window.__ailInstall = null;
    setAvailable(false);
    try {
      await e.prompt();
      const { outcome } = await e.userChoice;
      return outcome;
    } catch {
      return "unavailable";
    }
  }, []);

  return { available, prompt, justInstalled };
}
