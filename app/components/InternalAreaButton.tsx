import { Monitor } from "lucide-react";
import { SITE_CONFIG } from "../config";

export function InternalAreaButton() {
  if (!SITE_CONFIG.internalSystemUrl) return null;

  return (
    <a
      href={SITE_CONFIG.internalSystemUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 items-center gap-2 rounded-full bg-secondary px-3 text-sm font-bold text-secondary-foreground transition-colors hover:bg-secondary/80"
      title="Área interna"
    >
      <Monitor className="h-4 w-4 text-red-600" />
      <span className="hidden sm:inline">Área interna</span>
    </a>
  );
}
