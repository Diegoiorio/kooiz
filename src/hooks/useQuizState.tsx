/*
 * Custom hook that centralizes all quiz state and logic.
 * It manages steps, quiz parameters, categories, loaded questions, and results history.
 * Used in App.tsx to keep the component clean and focused on rendering.
 */
import { useEffect, useState } from "react";
import {
  QuizDifficulty,
  QuizType,
  Step,
  type FetchQuizParams,
  type QuizCategory,
  type QuizItem,
} from "../types/quis-types";
import { QuizAPI } from "../api/quiz-api";

export function useQuizState() {
  // DEFINE STAES

  // Step
  const [step, setStep] = useState<Step>(Step.Loading); // Loading is first step by befault

  // Quiz state (questions list)
  const [quiz, setQuiz] = useState<QuizItem[]>([]);

  // Quiz results
  const [history, setHistory] = useState<boolean[]>([]);

  // Quiz params
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });

  // Categories
  const [categories, setCategories] = useState<QuizCategory[]>([]);

  // Init: Load categorieas and start the application
  useEffect(() => {
    (async () => {
      const fetched = await QuizAPI.fetchCatregories();
      setCategories([{ id: -1, name: "Mixed" }, ...fetched]);
      setStep(Step.SetQuestionQty);
    })();
  }, []);

  // HANDLERS

  // Set question amount (step 1)
  const changeQuestionAmount = (amount: number) => {
    setQuizParams((prev) => ({ ...prev, amount }));
    setStep(Step.SetQuestionCategory);
  };

  // Set question category (step 2)
  const changeQuestionCategory = (category: string) => {
    setQuizParams((prev) => ({
      ...prev,
      category: category === "-1" ? "" : category,
    }));
    setStep(Step.SetQuestionDifficulty);
  };

  // Set question difficulty (step 3)
  const changeQuestionDifficulty = async (difficulty: QuizDifficulty) => {
    const params = {
      ...quizParams,
      difficulty, // overwrite only difficulty
    };

    setQuizParams(params); // Now we have all parameters to start the quiz

    const quizResp = await QuizAPI.fetchQuiz(params); // Fetch all questions
    if (quizResp.length > 0) {
      setQuiz(quizResp); // Store loaded quiz items
      setStep(Step.Play);
    } else {
      alert(
        `Couldn't find ${params.amount} questions for this categories, restarting game`
      );
      setStep(Step.SetQuestionQty);
    }
  };

  // Returns all functions and states
  return {
    step,
    setStep,
    quiz,
    setQuiz,
    history,
    setHistory,
    quizParams,
    setQuizParams,
    categories,
    changeQuestionAmount,
    changeQuestionCategory,
    changeQuestionDifficulty,
  };
}
