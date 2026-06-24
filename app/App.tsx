import { lazy, Suspense, useRef, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Brand } from "./components/data";
import { useBrands } from "./supabase/brands";
import { HomePage } from "./components/HomePage";
import { BrandPage } from "./components/BrandPage";
import { AboutPage } from "./components/AboutPage";
import { WhatsAppButton } from "./components/WhatsAppButton";

// Painel de administração: carregado só quando se acessa /admin (não pesa no site).
const AdminApp = lazy(() => import("./admin/AdminApp"));

type Page = "home" | "about";

export default function App() {
  const isAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Carregando painel…</div>}>
          <AdminApp />
        </Suspense>
      </ThemeProvider>
    );
  }

  return <PublicSite />;
}

function PublicSite() {
  const { brands } = useBrands();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectBrand = (brand: Brand) => {
    setCurrentBrand(brand);
    setCurrentPage("home");
    setTimeout(scrollToTop, 0);
  };

  const handleBack = () => {
    setCurrentBrand(null);
    setCurrentPage("home");
    setTimeout(scrollToTop, 0);
  };

  const handleShowAbout = () => {
    setCurrentPage("about");
    setCurrentBrand(null);
    setTimeout(scrollToTop, 0);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div ref={containerRef} className="size-full overflow-y-auto bg-background text-foreground transition-colors duration-300">
        {currentBrand ? (
          <BrandPage brand={currentBrand} onBack={handleBack} scrollContainer={containerRef} />
        ) : currentPage === "about" ? (
          <AboutPage onBack={handleBack} onSelectBrand={handleSelectBrand} brands={brands} />
        ) : (
          <HomePage
            onSelectBrand={handleSelectBrand}
            onNavigateAbout={handleShowAbout}
            scrollContainer={containerRef}
            brands={brands}
          />
        )}
        <WhatsAppButton
          message={
            currentBrand
              ? `Olá! Vim pelo site da S&A Representações e gostaria de fazer um pedido de produtos da marca *${currentBrand.name}*.`
              : "Olá! Vim pelo site da S&A Representações e gostaria de mais informações."
          }
        />
      </div>
    </ThemeProvider>
  );
}
