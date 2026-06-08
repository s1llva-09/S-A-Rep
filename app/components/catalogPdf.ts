import { Brand } from "./data";

function safeFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}

async function tryStaticCatalog(brand: Brand): Promise<boolean> {
  const url = `/catalogs/${brand.id}-catalogo.pdf`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) {
      const a = document.createElement("a");
      a.href = url;
      a.download = `catalogo-${safeFileName(brand.name)}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    }
  } catch {}
  return false;
}

export async function downloadBrandCatalogPdf(brand: Brand) {
  if (await tryStaticCatalog(brand)) return;
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  let y = 22;

  const addFooter = () => {
    doc.setFontSize(9);
    doc.setTextColor(120, 126, 138);
    doc.text("S&A Representacoes", margin, pageHeight - 10);
    doc.text(String(doc.getNumberOfPages()), pageWidth - margin, pageHeight - 10, { align: "right" });
  };

  doc.setFillColor(23, 25, 35);
  doc.rect(0, 0, pageWidth, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(`Catalogo ${brand.name}`, margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(brand.tagline, margin, y + 8);

  y = 56;
  doc.setTextColor(35, 39, 48);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Produtos", margin, y);
  y += 9;

  brand.catalogProducts.forEach((product, index) => {
    if (y > pageHeight - 34) {
      addFooter();
      doc.addPage();
      y = 22;
    }

    doc.setDrawColor(205, 211, 222);
    doc.line(margin, y - 4, pageWidth - margin, y - 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(24, 28, 37);
    doc.text(`${index + 1}. ${product.name}`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(92, 100, 116);
    doc.text(`Ref: ${product.ref} | Categoria: ${product.category}`, margin, y + 6);

    const descriptionLines = doc.splitTextToSize(product.description, pageWidth - margin * 2);
    doc.text(descriptionLines, margin, y + 12);
    y += 19 + descriptionLines.length * 4;
  });

  addFooter();
  doc.save(`catalogo-${safeFileName(brand.name)}.pdf`);
}
