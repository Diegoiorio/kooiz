import { Flex, Image, Box } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImage from "./assets/bubble.png";
import "./global.css";
import { useQuizState } from "./hooks/useQuizState";
import { ScreenRendererByStep } from "./features/ScreenRendererByStep";

export default function App() {
  const enableLogo = false;

  // Custon hook to get all states and relative functions
  const {
    step,
    setStep,
    quiz,
    history,
    setHistory,
    categories,
    changeQuestionAmount,
    changeQuestionCategory,
    changeQuestionDifficulty,
  } = useQuizState();

  return (
    <Box py={"10"} h="100%">
      <Flex justify="center">
        <Image h="24" src={logoImg} />
      </Flex>

      {enableLogo && (
        <Image
          src={bubbleImage}
          position={"absolute"}
          zIndex={-1}
          right={-120}
          top={100}
        ></Image>
      )}

      <Box mt={50}>
        <ScreenRendererByStep
          step={step}
          changeQuestionAmount={changeQuestionAmount}
          categories={categories}
          changeQuestionCategory={changeQuestionCategory}
          changeQuestionDifficulty={changeQuestionDifficulty}
          quiz={quiz}
          setHistory={setHistory}
          setStep={setStep}
          history={history}
        />
      </Box>
    </Box>
  );
}
