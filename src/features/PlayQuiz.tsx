import { useEffect, useState } from "react";
import type { DotLottiePlayer, QuizItem } from "../types/quis-types";
import {
  Box,
  Flex,
  Heading,
  HStack,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import validAnim from "../assets/valid.json?url";
import invalidAnim from "../assets/invalid.json?url";

export function PlayQuiz(p: { quiz: QuizItem[] }) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);

  const currentQuizItem = p.quiz[currentQuizItemIndex];

  const [history, setHistory] = useState<boolean[]>([]);

  // Available answers handler
  const [availableAnswers, setAvailableAnswers] = useState<string[]>([]);

  useEffect(() => {
    setAvailableAnswers(
      [
        currentQuizItem.correct_answer,
        ...currentQuizItem.incorrect_answers,
      ].sort(() => Math.random() - 0.5) // Shuffle answers
    );
  }, [currentQuizItemIndex]);

  const [answer, setAnswer] = useState<string | null>(null);
  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");

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

  function decodeHtmlEntities(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  // Dot Lottie handler
  const [dotLottie, setDotLottie] = useState<DotLottiePlayer | null>(null);

  useEffect(() => {
    if (!dotLottie) return;

    // This function will be called when the animation is completed.
    function onComplete() {
      setQuestionStatus("unanswered");
      setCurrentQuizItemIndex(currentQuizItemIndex + 1);
    }

    // This function will be called when the animation starts playing.
    function onPlay() {
      console.log("Animation start playing");
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

  const renderProgressBar = () => {
    console.log(history);

    return (
      <HStack>
        {p.quiz.map((quizItem, i) => {
          return (
            <Box
              key={i}
              height={3}
              width={25}
              backgroundColor={
                i >= currentQuizItemIndex
                  ? "gray.300"
                  : history[i]
                  ? "green.400"
                  : "red.400"
              }
            />
          );
        })}
      </HStack>
    );
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      margin={"auto"}
      width={"80%"}
    >
      {renderProgressBar()}
      <Heading fontSize={"3xl"} mt={100} mb={20}>
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
                color={
                  questionStatus === "unanswered"
                    ? "black"
                    : isValidAnswer(availableAnswer)
                    ? "green"
                    : "red"
                }
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
