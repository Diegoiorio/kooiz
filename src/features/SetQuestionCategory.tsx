import { useState } from "react";
import type { QuizCategory } from "../types/quis-types";
import {
  Button,
  Flex,
  Heading,
  Icon,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import { HiChartBar } from "react-icons/hi";

export function SetQuestionCategory(p: {
  categories: QuizCategory[];
  onClickNext: (categoryId: string) => void;
}) {
  const [selectCategoryId, setSelectCategoryId] = useState<string>(
    p.categories[0].id.toString()
  );

  return (
    <>
      <Flex direction="column" alignItems="center">
        <Heading as="h1" fontSize="3xl" mb={20}>
          Witch topic?
        </Heading>

        <RadioGroup.Root
          value={selectCategoryId}
          onValueChange={(e) => setSelectCategoryId(e.value ?? "")}
          display={"flex"}
          justifyContent={"center"}
        >
          <SimpleGrid columns={[3, null, 4]} gap="40px">
            {p.categories.map((category) => (
              <RadioGroup.Item key={category.id} value={category.id.toString()}>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{category.name}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </SimpleGrid>
        </RadioGroup.Root>
      </Flex>

      <Flex direction="column" alignItems="center">
        <Button
          position="absolute"
          top="80%"
          onClick={() => p.onClickNext(selectCategoryId)}
        >
          Set Set Difficulty
          <Icon size="lg">
            <HiChartBar />
          </Icon>
        </Button>
      </Flex>
    </>
  );
}
