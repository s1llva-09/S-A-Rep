import { Headphones, MapPin, MessageCircle } from "lucide-react";
import { Brand } from "./data";
import { SITE_CONFIG } from "../config";

interface FooterProps {
  onSelectBrand: (brand: Brand) => void;
  brands: Brand[];
}

export function Footer({ onSelectBrand, brands }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                <img src="/assets/sa-logo.png" alt="S&A" className="h-10 w-10 object-contain" />
              </span>
              <div>
                <p className="text-sm font-black text-foreground">{SITE_CONFIG.companyName}</p>
                <p className="text-xs font-semibold text-muted-foreground">{SITE_CONFIG.shortDescription}</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Consultoria Comercial no segmento de motopeças.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-black uppercase text-muted-foreground">Marcas</p>
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => onSelectBrand(brand)}
                  className="flex items-center gap-2 text-left text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: brand.color }} />
                  {brand.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-black uppercase text-muted-foreground">Atendimento</p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-600" />
                BA, SE, AL e PE
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.televendasNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Headphones className="h-4 w-4 text-red-600" />
                Televendas: {SITE_CONFIG.televendasDisplay}
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.sacNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-red-600" />
                SAC: {SITE_CONFIG.sacDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.companyName} Ltda. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
