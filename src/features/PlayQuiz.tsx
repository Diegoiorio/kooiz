import { useState } from "react";
import type { QuizItem } from "../types/quis-types";

export function PlayQuiz(p: { quiz: QuizItem[] }) {
  console.log(p.quiz);

  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentQuizItem = p.quiz[currentQuizItemIndex];
  const availableAnswers = [
    currentQuizItem.correct_answer,
    ...currentQuizItem.incorrect_answers,
  ];

  return <></>;
}
