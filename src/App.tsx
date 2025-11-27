import { Flex, Image, Box } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImage from "./assets/bubble.png";
import "./global.css";
import { useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";
import type { FetchQuizParams } from "./types/quis-types";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  ScoreScreen,
}

export default function App() {
  const enableLogo = false;

  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>();

  const header = (
    <Flex justify="center">
      <Image h="24" src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return <SetQuestionQty defaultValue={15} max={30} min={5} step={5} />;
      case Step.SetQuestionCategory:
        return <></>;
      case Step.SetQuestionDifficulty:
        return <></>;
      case Step.Play:
        return <></>;
      case Step.ScoreScreen:
        return <></>;
    }
  };

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
