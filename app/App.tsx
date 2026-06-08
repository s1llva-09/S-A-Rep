import { useRef, useState } from "react";
import { ThemeProvider } from "next-themes";
import { Brand } from "./components/data";
import { HomePage } from "./components/HomePage";
import { BrandPage } from "./components/BrandPage";
import { AboutPage } from "./components/AboutPage";
import { WhatsAppButton } from "./components/WhatsAppButton";

type Page = "home" | "about";

export default function App() {
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
          <AboutPage onBack={handleBack} onSelectBrand={handleSelectBrand} />
        ) : (
          <HomePage
            onSelectBrand={handleSelectBrand}
            onNavigateAbout={handleShowAbout}
            scrollContainer={containerRef}
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
