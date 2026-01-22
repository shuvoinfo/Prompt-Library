
export interface PromptItem {
  id: string;
  title: string;
  category: 'Video' | 'Script' | 'Graphics' | 'SEO' | 'Story';
  content: string;
  description: string;
}

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface HistoryItem {
  id: string;
  promptTitle: string;
  userInput: string;
  output: string;
  timestamp: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
