export type ApiConnection = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  is_connected: boolean;
  agent_source_api_connection_id: number;
  agent_graph_api_connection_id: number;
};

export type ExchangeRateType = {
  id: number;
  title: string;
  base_currency: string;
  target_currency: string;
  value: number;
  date: string;
};

export type CPIRatesObservations = {
  d: string;
  STATIC_TOTALCPICHANGE?: { v?: string };
  CPI_MEDIAN?: { v?: string };
  CPI_TRIM?: { v?: string };
  STATIC_CPIXFET?: { v?: string };
  CPI_COMMON?: { v?: string };
  CPIW?: { v?: string };
  V41690973?: { v?: string };
  V41690914?: { v?: string };
};
export type GetExchangeRate = {
  error_message: null;
  recent_exchange_rates: ExchangeRateType[];
  recent_cpi_rates: {
    observations: CPIRatesObservations[];
  };
};

export type Files = {
  created_at: string;
  file_category: string;
  file_characters: number;
  file_name: string;
  file_url: string;
  id: number;
  source_context: string;
  source_instructions: string;
  source_name: string;
  updated_at: string;
  website_auto_update: null | string;
  website_url: null | string;
};
export type Organization = {
  id: number;
  ran_id: string;
  name: string;
  email: string;
  created_at: string;
  image: string | null;
};
export type InstructionsType = {
  id: number;
  title: string;
  instructions: string;
  is_active: boolean;
};
export interface StateAgent {
  id: number;
  name: string;
  image_url: null | string;
}
export interface AgentState {
  id: number;
  organization?: Organization | null;
  instructions?: InstructionsType[];
  files?: Files[];
  name?: string;
  text?: string;
  qa?: string;
  ran_id?: string;
  status?: string;
  model?: string;
  visibility?: string;
  temperature?: number;
  image_url: string;
  logo_url: string;
  boc_connected?: boolean;
  created_at?: string;
  updated_at?: string;
  customuser?: number;
}
export const agentState: AgentState = {
  id: 0,
  image_url: "",
  organization: null,
  file_urls: null,
  name: "",
  text: "",
  qa: "",
  ran_id: "",
  status: "",
  model: "",
  visibility: "",
  temperature: 0,
  created_at: "",
  updated_at: "",
  customuser: 0,
  boc_connected: false,
  instructions: "",
};
export type AgentAllChatType = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  agent: number;
  user: number;
};
export const agentAllChatType: AgentAllChatType = {
  id: 0,
  title: "",
  created_at: "",
  updated_at: "",
  agent: 0,
  user: 0,
};

export type AgentChatType = {
  user_id: number | null;
  id: number | null;
  role: string;
  message: string;
  sender_name?: string;
  created_at?: string;
};

export type VoiceRes = {
  inText: string;
};

export const voiceRes: VoiceRes = {
  inText: "",
};

export type UserProfile = {
  id: number;
  first_name: string;
  email: string;
  role: string;
  organization: number;
  is_first_interaction_with_agent: boolean;
};

export type ReportType = {
  summary_name: string;
  auto_update: string;
  sections: [
    {
      section_name: string;
      section_report: string;
      sources: [""];
    }
  ];
  request_payload: {
    sections: [
      {
        source: {
          file_id: number | null;
          agent_graph_api_connection_id: number | null;
          agent_source_api_connection_id: number | null;
        };
        instructions: string;
        section_name: string;
        display_source_links: boolean;
      }
    ];
    auto_update: string;
    summary_name: string;
  };
};
