"use client";

import { useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "theme";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

// The inline script in layout.tsx sets the "dark" class before hydration,
// so by the time this component mounts on the client, the DOM already
// reflects the real theme - but the server has no DOM. useSyncExternalStore
// (rather than a setState-in-effect) is the pattern React recommends for
// "only trust this value once we're on the client", avoiding an extra
// cascading render.
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const mounted = useMounted();
  const [isDark, setIsDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mounted ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
      onClick={toggle}
    >
      {mounted && isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
