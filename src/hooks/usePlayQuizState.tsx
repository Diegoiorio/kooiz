import { useEffect, useState } from "react";
import type { DotLottiePlayer, QuizItem } from "../types/quis-types";

export function usePlayQuizState(
  quiz: QuizItem[],
  onFinished: (history: boolean[]) => void
) {
  // Quiz timer in seconds for each question
  const questionSecTimer = 20;

  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);

  const [history, setHistory] = useState<boolean[]>([]);

  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);

  const [answer, setAnswer] = useState<string | null>(null);

  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");

  const [dotLottie, setDotLottie] = useState<DotLottiePlayer | null>(null);

  const currentQuizItem = quiz[currentQuizItemIndex];

  useEffect(() => {
    setAvailableAnswers(
      [
        currentQuizItem.correct_answer,
        ...currentQuizItem.incorrect_answers,
      ].sort(() => Math.random() - 0.5) // Shuffle answers
    );
  }, [
    currentQuizItem.correct_answer,
    currentQuizItem.incorrect_answers,
    currentQuizItemIndex,
  ]);

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  useEffect(() => {
    if (answer) {
      const isValid = isValidAnswer(answer);
      if (isValid) {
        setQuestionStatus("valid");
      } else {
        setQuestionStatus("invalid");
      }
      setHistory([...history, isValid]);
    }
  }, [answer]);

  useEffect(() => {
    if (!dotLottie) return;

    // This function will be called when the animation is completed.
    function onComplete() {
      if (currentQuizItemIndex < quiz.length - 1) {
        setQuestionStatus("unanswered");
        setCurrentQuizItemIndex(currentQuizItemIndex + 1);
      } else {
        onFinished(history);
      }
    }

    // This function will be called when the animation starts playing.
    function onPlay() {
      // Could be useful for future implementations
    }

    // Add event listener on dotLottie component
    dotLottie.addEventListener("complete", onComplete);
    dotLottie.addEventListener("play", onPlay);

    return () => {
      dotLottie.removeEventListener("complete", onComplete);
      dotLottie.removeEventListener("play", onPlay);
    };
  }, [dotLottie]);

  return {
    questionSecTimer,
    currentQuizItemIndex,
    history,
    setHistory,
    availableAnswers,
    answer,
    setAnswer,
    questionStatus,
    setQuestionStatus,
    setDotLottie,
    isValidAnswer,
    currentQuizItem,
  };
}
