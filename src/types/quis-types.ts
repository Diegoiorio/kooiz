export interface FetchQuizParams {
  amount: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}

export enum Step {
  Loading,
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  ScoreScreen,
}

export enum QuizDifficulty {
  Mixed = "",
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum QuizType {
  Mixed = "",
  Multiple = "multiple",
  Boolean = "boolean",
}

export interface QuizCategory {
  id: number;
  name: string;
}

export interface FetchQuizCategoriesResponse {
  trivia_categories: QuizCategory[];
}

export interface FetchQuizResponse {
  response_code: number;
  results: QuizItem[];
}

export interface QuizItem {
  type: QuizType;
  difficulty: QuizDifficulty;
  category: number;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type DotLottiePlayer = {
  addEventListener: (event: string, cb: () => void) => void;
  removeEventListener: (event: string, cb: () => void) => void;
};

export interface QtyProps {
  max: number;
  min: number;
  step: number;
  defaultValue: number;
  onClickNext: (amount: number) => void;
}

export type mark = {
  value: number;
  label: string;
};

export interface ScreenRenderProps {
  step: Step;
  changeQuestionAmount: (amount: number) => void;
  categories: QuizCategory[];
  changeQuestionCategory: (category: string) => void;
  changeQuestionDifficulty: (difficulty: QuizDifficulty) => Promise<void>;
  quiz: QuizItem[];
  setHistory: React.Dispatch<React.SetStateAction<boolean[]>>;
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  history: boolean[];
}
