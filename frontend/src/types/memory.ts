export interface Memory {
  id: string;
  content: string;
  timestamp: Date;
  type: string;
  tags: string[];
  source: string;
  metadata: Record<string, any>;
}

export interface MemoryFormData {
  content: string;
  type: string;
  tags: string;
  source: string;
}