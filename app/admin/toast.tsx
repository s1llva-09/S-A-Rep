import { useEffect, useState } from "react";

// Toast minimalista e sem dependências externas (evita conflitos de instância
// do React em chunks lazy). API: toast.success(...) / toast.error(...).
type ToastType = "success" | "error";
interface ToastItem {
  id: number;
  msg: string;
  type: ToastType;
}

let listeners: ((t: ToastItem) => void)[] = [];
let counter = 0;

function emit(msg: string, type: ToastType) {
  const item = { id: ++counter, msg, type };
  listeners.forEach((l) => l(item));
}

export const toast = {
  success: (msg: string) => emit(msg, "success"),
  error: (msg: string) => emit(msg, "error"),
};

export function ToastHost() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const l = (t: ToastItem) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== t.id)), 3500);
    };
    listeners.push(l);
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto rounded-lg px-4 py-3 text-sm font-bold shadow-lg ${
            t.type === "error" ? "bg-red-600 text-white" : "bg-foreground text-background"
          }`}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
