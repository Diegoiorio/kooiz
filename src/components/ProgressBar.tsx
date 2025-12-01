import { Box, HStack } from "@chakra-ui/react";
import type { QuizItem } from "../types/quis-types";

export function ProgressBar(p: {
  quiz: QuizItem[];
  currentQuizItemIndex: number;
  history: boolean[];
}) {
  return (
    <HStack>
      {p.quiz.map((quizItem, i) => {
        return (
          <Box
            key={i}
            height={3}
            width={25}
            backgroundColor={
              i >= p.currentQuizItemIndex
                ? "gray.300"
                : p.history[i]
                ? "green.400"
                : "red.400"
            }
          />
        );
      })}
    </HStack>
  );
}
