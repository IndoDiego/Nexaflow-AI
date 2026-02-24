export type ServiceCategory =
  | "chatbots"
  | "automation"
  | "crm"
  | "marketing"
  | "analytics"
  | "custom"
  | "audit"
  | "training";

export interface Service {
  id: string;
  slug: string;
  category: ServiceCategory;
  icon: string;
  techStack: string[];
  featured: boolean;
}

export const services: Service[] = [
  {
    id: "chatbots",
    slug: "chatbots-asistentes-virtuales",
    category: "chatbots",
    icon: "MessageSquare",
    techStack: ["OpenAI API", "Botpress", "Voiceflow", "Dialogflow", "WhatsApp API"],
    featured: true,
  },
  {
    id: "automation",
    slug: "automatizacion-procesos",
    category: "automation",
    icon: "Workflow",
    techStack: ["Zapier", "Make", "n8n", "Power Automate"],
    featured: true,
  },
  {
    id: "crm",
    slug: "crm-inteligente",
    category: "crm",
    icon: "Users",
    techStack: ["HubSpot", "Salesforce Einstein", "Pipedrive"],
    featured: true,
  },
  {
    id: "marketing",
    slug: "marketing-automation",
    category: "marketing",
    icon: "TrendingUp",
    techStack: ["ActiveCampaign", "Mailchimp", "Buffer", "Canva AI"],
    featured: true,
  },
  {
    id: "analytics",
    slug: "analitica-business-intelligence",
    category: "analytics",
    icon: "BarChart3",
    techStack: ["Metabase", "Tableau", "Power BI", "Looker Studio"],
    featured: false,
  },
  {
    id: "custom",
    slug: "soluciones-ai-personalizadas",
    category: "custom",
    icon: "Cpu",
    techStack: ["Python", "LangChain", "RAG", "Vector DBs", "Fine-tuning"],
    featured: true,
  },
  {
    id: "audit",
    slug: "auditoria-assessment",
    category: "audit",
    icon: "Search",
    techStack: ["Framework Propio"],
    featured: true,
  },
  {
    id: "training",
    slug: "capacitacion-workshops",
    category: "training",
    icon: "GraduationCap",
    techStack: ["Curriculum Personalizado"],
    featured: false,
  },
];

export const categories: { key: ServiceCategory | "all"; translationKey: string }[] = [
  { key: "all", translationKey: "all" },
  { key: "chatbots", translationKey: "chatbots" },
  { key: "automation", translationKey: "automation" },
  { key: "crm", translationKey: "crm" },
  { key: "marketing", translationKey: "marketing" },
  { key: "analytics", translationKey: "analytics" },
  { key: "custom", translationKey: "custom" },
  { key: "training", translationKey: "training" },
];
