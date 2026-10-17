export type TypingModes = "time" | "words" | "quote" | "zen" | "custom";

export type FilterGroup = "punctuation" | "numbers" | "none";

export interface TypingCount {
  total: number;
  correct: number;
}
