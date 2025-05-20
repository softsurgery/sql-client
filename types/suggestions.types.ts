export interface SuggestionRequest {
  sql: string;
  cursor: number;
}

export interface SuggestionResponse {
  suggestions: string[];
}
