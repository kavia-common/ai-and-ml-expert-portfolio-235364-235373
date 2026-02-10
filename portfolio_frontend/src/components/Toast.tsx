"use client";

import * as React from "react";

export type ToastTone = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  tone: ToastTone;
  title: string;
  description?: string;
};

type ToastContextValue = {
  push: (msg: Omit<ToastMessage, "id">) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

// PUBLIC_INTERFACE
export function useToast() {
  /** Hook to push toast notifications. */
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider />");
  return ctx;
}

// PUBLIC_INTERFACE
export function ToastProvider({ children }: { children: React.ReactNode }) {
  /** Provider to render and manage toast notifications. */
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const push = React.useCallback((msg: Omit<ToastMessage, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((t) => [...t, { ...msg, id }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4200);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        className="fixed bottom-4 left-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`surface px-4 py-3 ${
              t.tone === "success"
                ? "border-emerald-600/25"
                : t.tone === "error"
                  ? "border-red-600/25"
                  : "border-blue-900/20"
            }`}
            role="status"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-extrabold text-black">
                  {t.title}
                </div>
                {t.description ? (
                  <div className="mt-1 text-xs font-semibold text-black/60">
                    {t.description}
                  </div>
                ) : null}
              </div>
              <button
                className="focus-ring rounded-lg px-2 py-1 text-xs font-bold text-black/50 hover:bg-black/5"
                onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}
                aria-label="Dismiss notification"
                type="button"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
