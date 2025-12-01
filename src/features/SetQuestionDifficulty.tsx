import { Flex, RadioGroup, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { HiPlay } from "react-icons/hi";
import { QuizDifficulty } from "../types/quis-types";
import { KooizTitle } from "../components/KooizTitle";
import { KooizButton } from "../components/KooizButton";

export function SetQuestionDifficulty(p: {
  onClickNext: (difficulty: QuizDifficulty) => void;
}) {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>(
    QuizDifficulty.Mixed
  );

  return (
    <>
      <Flex direction="column" alignItems="center">
        <KooizTitle>Select difficulty?</KooizTitle>
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

      <KooizButton
        onClickNext={() => p.onClickNext(difficulty)}
        icon={HiPlay}
      />
    </>
  );
}
