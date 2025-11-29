import { Flex, Image, Box } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImage from "./assets/bubble.png";
import "./global.css";
import { useEffect, useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";
import {
  QuizDifficulty,
  QuizType,
  type FetchQuizParams,
  type QuizCategory,
  type QuizItem,
} from "./types/quis-types";
import { SetQuestionCategory } from "./features/SetQuestionCategory";
import { QuizAPI } from "./api/quiz-api";
import { SetQuestionDifficulty } from "./features/SetQuestionDifficulty";
import { PlayQuiz } from "./features/PlayQuiz";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  ScoreScreen,
}

export default function App() {
  const enableLogo = false;

  const [step, setStep] = useState<Step>(Step.SetQuestionQty); // Quiz step state
  const [quiz, setQuiz] = useState<QuizItem[]>([]); // Quiz state (questions list)

  // Quis params state
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });

  // Quiz category state
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  useEffect(() => {
    (async () => {
      setCategories([
        { id: -1, name: "Mixed" },
        ...(await QuizAPI.fetchCatregories()),
      ]);
    })();
  }, []);

  // Set quantity step
  const changeQuestionAmount = (amount: number) => {
    setQuizParams((prev) => ({
      ...prev,
      amount, // overwrite only amount
    }));
    setStep(Step.SetQuestionCategory);
  };

  // Set category step
  const changeQuestionCategory = (category: string) => {
    setQuizParams((prev) => ({
      ...prev,
      category: category === "-1" ? "" : category, // overwrite only category
    }));
    setStep(Step.SetQuestionDifficulty);
  };

  // Set difficulty step
  const changeQuestionDifficulty = async (difficulty: QuizDifficulty) => {
    const params = {
      ...quizParams,
      difficulty, // overwrite only difficulty
    };

    setQuizParams(params);
    const quizResp = await QuizAPI.fetchQuiz(params);
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

  // Step rendering
  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={changeQuestionAmount}
            defaultValue={15}
            max={30}
            min={5}
            step={5}
          />
        );
      case Step.SetQuestionCategory:
        return (
          <SetQuestionCategory
            categories={categories}
            onClickNext={changeQuestionCategory}
          />
        );
      case Step.SetQuestionDifficulty:
        return <SetQuestionDifficulty onClickNext={changeQuestionDifficulty} />;
      case Step.Play:
        return <PlayQuiz quiz={quiz} />;
      case Step.ScoreScreen:
        return <></>;
    }
  };

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg} />
    </Flex>
  );

  return (
    <Box py={"10"} h="100%">
      {header}

      {enableLogo && (
        <Image
          src={bubbleImage}
          position={"absolute"}
          zIndex={-1}
          right={-120}
          top={100}
        ></Image>
      )}

      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
}
