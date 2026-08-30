import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase/client";
import { ContactPersonRow } from "./supabase/types";

export const DEFAULT_TEAM: ContactPersonRow[] = [
  {
    id: "aline-brandao",
    name: "Aline Brandrão",
    role: "Televendas",
    phone: "5575992151613",
    phone_display: "(75) 99215-1613",
    image_url: null,
    sort_order: 0,
  },
  {
    id: "ana-paula",
    name: "Ana Paula",
    role: "SAC",
    phone: "5575992041613",
    phone_display: "(75) 99204-1613",
    image_url: null,
    sort_order: 1,
  },
];

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
  // Subdomínio do sistema interno (Locaweb). Vazio = botão não aparece no rodapé.
  internalSystemUrl: "https://interno.sarepresentacoes.com",
};

export async function fetchContactPeople(): Promise<ContactPersonRow[]> {
  if (!isSupabaseConfigured || !supabase) {
    return DEFAULT_TEAM;
  }

  const { data, error } = await supabase
    .from("contact_people")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.error("Erro ao buscar contatos do Supabase:", error);
    return DEFAULT_TEAM;
  }

  return data as ContactPersonRow[];
}

/**
 * Contatos do atendimento. Começa com DEFAULT_TEAM (render instantâneo)
 * e substitui pelo que estiver no Supabase, igual ao useBrands.
 */
export function useContactPeople(): ContactPersonRow[] {
  const [team, setTeam] = useState<ContactPersonRow[]>(DEFAULT_TEAM);

  useEffect(() => {
    let active = true;
    fetchContactPeople()
      .then((people) => {
        if (active) setTeam(people);
      })
      .catch(() => {
        if (active) setTeam(DEFAULT_TEAM);
      });

    return () => {
      active = false;
    };
  }, []);

  return team;
}

export const getWhatsAppUrl = (message: string) => {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
