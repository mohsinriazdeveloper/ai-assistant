export type FileInfo = {
  file_id: number;
  file_name: string;
  file_url: string;
  characters_count: number;
  error_message: string | null;
};

export type FileTags = {
  file_id: number;
  source_name: string;
  source_context: string;
  source_instructions: string;
};
export type FileTags = {
  file_id: number;
  source_name: string;
  source_context: string;
  source_instructions: string;
};

export type ExistingFile = {
  file: string;
  source_name: string;
  source_context: string;
  source_instructions: string;
};

export type FileandFlag = {
  file: File;
  isFile: boolean;
};

export type WebsiteTags = {
  website_url: string;
  source_name: string;
  source_context: string;
  source_instructions: string;
  website_auto_update: string;
};

export type QATypes = {
  question: string;
  answer: string;
};
