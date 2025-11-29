import {
  Button,
  Flex,
  Heading,
  Icon,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiPlay } from "react-icons/hi";
import { QuizDifficulty } from "../types/quis-types";

export function SetQuestionDifficulty(p: {
  onClickNext: (difficulty: QuizDifficulty) => void;
}) {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(
    QuizDifficulty.Mixed
  );

  return (
    <>
      <Flex direction="column" alignItems="center">
        <Heading as="h1" fontSize="3xl" mb={20}>
          Select difficulty?
        </Heading>
      </Flex>

      <RadioGroup.Root
        value={difficulty}
        onValueChange={(e) => setDifficulty((e.value as QuizDifficulty) ?? "")}
        display={"flex"}
        justifyContent={"center"}
      >
        <VStack>
          {Object.entries(QuizDifficulty).map(([key, value]) => (
            <RadioGroup.Item key={key} value={value} m={"10px"}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{key}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </VStack>
      </RadioGroup.Root>

      <Flex direction="column" alignItems="center">
        <Button
          position="absolute"
          top="80%"
          onClick={() => p.onClickNext(difficulty)}
        >
          Play!
          <Icon size="lg">
            <HiPlay />
          </Icon>
        </Button>
      </Flex>
    </>
  );
}
