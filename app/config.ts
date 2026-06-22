export const SITE_CONFIG = {
  // Formato dos números: código do país + DDD + número. Ex: 5575992151613.
  // whatsappNumber é o contato principal usado nos botões/CTAs (Televendas).
  whatsappNumber: "5575992151613",
  televendasNumber: "5575992151613",
  televendasDisplay: "(75) 99215-1613",
  sacNumber: "5575992041613",
  sacDisplay: "(75) 99204-1613",
  companyName: "S&A Representações",
  shortDescription: "Especialista em Motopeças",
};

export const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
