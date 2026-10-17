import type {
  FilterGroup,
  TypingCount,
  TypingModes,
} from "../types/typing.types";

export const initialTypingState: number = 15;

export const initialModeState: TypingModes = "time";

export const initialFilterGroupState: FilterGroup[] = [];

export const initialTypingCountState: TypingCount = {
  total: 0,
  correct: 0,
};
