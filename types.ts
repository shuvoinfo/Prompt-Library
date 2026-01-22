
export interface PromptItem {
  id: string;
  title: string;
  category: 'Video' | 'Script' | 'Graphics' | 'SEO' | 'Other';
  content: string;
  description: string;
}

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
