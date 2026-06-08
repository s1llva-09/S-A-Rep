export const SITE_CONFIG = {
  // Substitua este número pelo contato real do representante.
  // Formato: código do país + DDD + número. Exemplo: 5511999999999.
  whatsappNumber: "5511999999999",
  companyName: "S&A Representações",
  shortDescription: "Especialista em Motopeças",
};

export const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
