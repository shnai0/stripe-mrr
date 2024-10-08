interface Validation {
  type: "positive" | "negative";
  message: string;
}

interface RankResponse {
  score: number;
  validations: Array<ProcessedValidation>;
}

interface Rank {
  score: number;
  message?: string;
  type?: "positive" | "negative";
}

interface AnalysisResult {
  score: number;
  comparative: number;
  calculation: Array<{
    [token: string]: number;
  }>;
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
}
interface PostData {
  post: string;
  name: string;
  sector: string;
  round: string;
  country: string;
  originalPost: string;
  sentiment: AnalysisResult;
  postMedia: boolean;
}

declare module "country-list" {
  export function getNames(): string[];
}
