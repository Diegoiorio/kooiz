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
} from "./types/quis-types";
import { SetQuestionCategory } from "./features/SetQuestionCategory";
import { QuizAPI } from "./api/quiz-api";
import { SetQuestionDifficulty } from "./features/SetQuestionDifficulty";

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

  // Quis params state
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });

  console.log(quizParams);

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
  const changeQuestionDifficulty = (difficulty: QuizDifficulty) => {
    setQuizParams((prev) => ({
      ...prev,
      difficulty, // overwrite only difficulty
    }));
    setStep(Step.Play);
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
        return <></>;
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
