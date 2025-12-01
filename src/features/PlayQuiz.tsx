import { useEffect, useState } from "react";
import type { DotLottiePlayer, QuizItem } from "../types/quis-types";
import { Box, Flex, Heading, RadioGroup, SimpleGrid } from "@chakra-ui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import validAnim from "../assets/valid.json?url";
import invalidAnim from "../assets/invalid.json?url";
import { Timer } from "./Timer";
import { ProgressBar } from "../components/ProgressBar";

export function PlayQuiz(p: {
  quiz: QuizItem[];
  onFinished: (history: boolean[]) => void;
}) {
  const questionSecTimer = 20;

  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);

  const [history, setHistory] = useState<boolean[]>([]);

  // Available answers handler
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);

  const [answer, setAnswer] = useState<string | null>(null);

  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");

  // Dot Lottie handler
  const [dotLottie, setDotLottie] = useState<DotLottiePlayer | null>(null);

  const currentQuizItem = p.quiz[currentQuizItemIndex];

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

  const decodeHtmlEntities = (str: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  useEffect(() => {
    if (!dotLottie) return;

    // This function will be called when the animation is completed.
    function onComplete() {
      if (currentQuizItemIndex < p.quiz.length - 1) {
        setQuestionStatus("unanswered");
        setCurrentQuizItemIndex(currentQuizItemIndex + 1);
      } else {
        p.onFinished(history);
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

  const dotLottieRefCallback = (dotLottie: DotLottiePlayer | null) => {
    setDotLottie(dotLottie);
  };

  const failQuestion = () => {
    setHistory([...history, false]);
    setQuestionStatus("invalid");
  };

  const generateQuestionColor = (availableAnswer: string) => {
    return questionStatus === "unanswered"
      ? "black"
      : isValidAnswer(availableAnswer)
      ? "green"
      : "red";
  };

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
          <Timer max={questionSecTimer} onFinished={failQuestion} />
        </Box>
      )}

      <ProgressBar
        quiz={p.quiz}
        currentQuizItemIndex={currentQuizItemIndex}
        history={history}
      />

      <Heading fontSize={"3xl"} mt={50} mb={20} textAlign={"center"}>
        {decodeHtmlEntities(currentQuizItem.question)}
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
                color={generateQuestionColor(availableAnswer)}
              >
                {decodeHtmlEntities(availableAnswer)}
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
          dotLottieRefCallback={dotLottieRefCallback}
        />
      )}
    </Flex>
  );
}
