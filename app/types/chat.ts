export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'salon';
  timestamp: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}