export type SearchType =
  | "Page"
  | "Service"
  | "Industry"
  | "Service area"
  | "Case study"
  | "Article"
  | "FAQ";

export type SearchHit = {
  path: string;
  title: string;
  type: SearchType;
  description: string;
  snippet: string;
  snippetHtml: string;
  score: number;
};
