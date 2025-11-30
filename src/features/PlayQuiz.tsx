import { useEffect, useState } from "react";
import type { QuizItem } from "../types/quis-types";
import { Flex, Heading, RadioGroup, SimpleGrid } from "@chakra-ui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import validAnim from "../assets/valid.json?url";
import invalidAnim from "../assets/invalid.json?url";

export function PlayQuiz(p: { quiz: QuizItem[] }) {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);

  const currentQuizItem = p.quiz[currentQuizItemIndex];
  const availableAnswers: string[] = [
    currentQuizItem.correct_answer,
    ...currentQuizItem.incorrect_answers,
  ];

  const [answer, setAnswer] = useState<string | null>();
  const [questionStatus, setQuestionStatus] = useState<
    "valid" | "invalid" | "unanswered"
  >("unanswered");

  const isValidAnswer = (answer: string): boolean => {
    return answer === currentQuizItem.correct_answer;
  };

  useEffect(() => {
    if (answer) {
      if (isValidAnswer(answer)) {
        setQuestionStatus("valid");
      } else {
        setQuestionStatus("invalid");
      }
    }
  }, [answer]);

  function decodeHtmlEntities(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  // Dot Lottie handler
  const [dotLottie, setDotLottie] = useState(null);

  useEffect(() => {
    // This function will be called when the animation is completed.
    function onComplete() {
      console.log("Animation completed");
      setQuestionStatus("unanswered");
      setCurrentQuizItemIndex(currentQuizItemIndex + 1);
    }

    // Listen to events emitted by the DotLottie instance when it is available.
    if (dotLottie) {
      dotLottie.addEventListener("complete", onComplete);
    }

    return () => {
      // Remove event listeners when the component is unmounted.
      if (dotLottie) {
        dotLottie.addEventListener("complete", onComplete);
      }
    };
  }, [dotLottie]);

  const dotLottieRefCallback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      margin={"auto"}
      width={"80%"}
    >
      <Heading fontSize={"3xl"} mt={100} mb={20}>
        {decodeHtmlEntities(currentQuizItem.question)}
      </Heading>
      <RadioGroup.Root
        value={answer}
        onValueChange={(answer) => {
          setAnswer(answer.value);
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
              <RadioGroup.ItemText>
                {decodeHtmlEntities(availableAnswer)}
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </SimpleGrid>
      </RadioGroup.Root>
      <p>{questionStatus}</p>

      {questionStatus !== "unanswered" && (
        <DotLottieReact
          src={questionStatus === "valid" ? validAnim : invalidAnim}
          loop={false}
          style={{ marginTop: 100, height: 150 }}
          autoplay
          dotLottieRefCallback={dotLottieRefCallback}
        />
      )}
    </Flex>
  );
}
