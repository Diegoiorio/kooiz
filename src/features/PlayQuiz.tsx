import type { QuizItem } from "../types/quis-types";
import { Box, Flex, Heading, RadioGroup, SimpleGrid } from "@chakra-ui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import validAnim from "../assets/valid.json?url";
import invalidAnim from "../assets/invalid.json?url";
import { Timer } from "./Timer";
import { ProgressBar } from "../components/ProgressBar";
import { usePlayQuizState } from "../hooks/usePlayQuizState";
import { PlayQuizUtilities } from "../utilities/playQuizUtilities";

export function PlayQuiz(p: {
  quiz: QuizItem[];
  onFinished: (history: boolean[]) => void;
}) {
  const {
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
  } = usePlayQuizState(p.quiz, p.onFinished);

  const playQuizUtility = new PlayQuizUtilities(
    isValidAnswer,
    setDotLottie,
    setHistory,
    questionStatus,
    history,
    setQuestionStatus
  );

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      margin={"auto"}
      width={"80%"}
    >
      {questionStatus === "unanswered" && (
        <Box position={"absolute"} top={50} right={50}>
          <Timer
            max={questionSecTimer}
            onFinished={playQuizUtility.failQuestion}
          />
        </Box>
      )}

      <ProgressBar
        quiz={p.quiz}
        currentQuizItemIndex={currentQuizItemIndex}
        history={history}
      />

      <Heading fontSize={"3xl"} mt={50} mb={20} textAlign={"center"}>
        {playQuizUtility.decodeHtmlEntities(currentQuizItem.question)}
      </Heading>

      <RadioGroup.Root
        value={answer ?? ""}
        onValueChange={(answer) => {
          if (questionStatus === "unanswered") {
            setAnswer(answer.value);
          }
        }}
        display={"flex"}
        justifyContent={"center"}
      >
        <SimpleGrid columns={2} gap="40px">
          {availableAnswers.map((availableAnswer: string) => (
            <RadioGroup.Item
              key={availableAnswer}
              value={availableAnswer}
              m={"10px"}
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText
                color={playQuizUtility.generateQuestionColor(availableAnswer)}
              >
                {playQuizUtility.decodeHtmlEntities(availableAnswer)}
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </SimpleGrid>
      </RadioGroup.Root>

      {questionStatus !== "unanswered" && (
        <DotLottieReact
          src={questionStatus === "valid" ? validAnim : invalidAnim}
          speed={questionStatus === "valid" ? 5 : 2}
          loop={false}
          style={{ marginTop: 100, height: 150 }}
          autoplay
          dotLottieRefCallback={playQuizUtility.dotLottieRefCallback}
        />
      )}
    </Flex>
  );
}
