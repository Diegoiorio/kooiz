export interface FetchQuizParams {
  amountOfQuestion: number;
  category: string;
  difficulty: QuizDifficulty;
  type: QuizType;
}

enum QuizDifficulty {
  Mixed = "",
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

enum QuizType {
  Mixed = "",
  Multiple = "multiple",
  Boolean = "boolean",
}
