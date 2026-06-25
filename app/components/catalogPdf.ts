import { Brand } from "./data";

function safeFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}

/**
 * Baixa um arquivo forçando o download (mesmo de outro domínio, como o Supabase).
 * O atributo `download` é ignorado em links cross-origin, então buscamos o
 * arquivo como blob e baixamos a partir de uma URL local.
 */
export async function downloadFileFromUrl(url: string, filename: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const objUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objUrl);
  } catch {
    // Se algo falhar (ex: CORS), abre em nova aba como alternativa.
    window.open(url, "_blank", "noopener");
  }
}

async function triggerDownload(url: string, brand: Brand) {
  await downloadFileFromUrl(url, `catalogo-${safeFileName(brand.name)}.pdf`);
}

async function tryStaticCatalog(brand: Brand): Promise<boolean> {
  // 1) PDF vindo do Supabase (CMS), se houver.
  if (brand.mainCatalogUrl) {
    await triggerDownload(brand.mainCatalogUrl, brand);
    return true;
  }
  // 2) PDF estático em /public/catalogs/{id}-catalogo.pdf.
  const url = `/catalogs/${brand.id}-catalogo.pdf`;
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) {
      await triggerDownload(url, brand);
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
