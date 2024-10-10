export type FileUrl = {
  file_url?: string;
  text_content?: string;
  id: number;
  file_name: string;
  website_url?: string;
};
export type Organization = {
  id: number;
  ran_id: string;
  name: string;
  email: string;
  created_at: string;
};
export type InstructionsType = {
  id: number;
  title: string;
  instructions: string;
  is_active: boolean;
};

export interface AgentState {
  id: number;
  image_url: string;
  organization?: Organization | null;
  instructions?: InstructionsType[];
  file_urls?: FileUrl[];
  name?: string;
  text?: string;
  qa?: string;
  ran_id?: string;
  status?: string;
  model?: string;
  visibility?: string;
  temperature?: number;
  created_at?: string;
  updated_at?: string;
  customuser?: number;
  instructions?: string;
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
  instructions: "",
};
export type AgentChatType = {
  id?: number;
  message: string;
  role: string;
  timestamp?: string;
  agent?: number;
  user?: number;
};

export type VoiceRes = {
  inText: string;
};

export const voiceRes: VoiceRes = {
  inText: "",
};
