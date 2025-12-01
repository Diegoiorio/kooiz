import { useState } from "react";
import type { QuizCategory } from "../types/quis-types";
import { Flex, RadioGroup, SimpleGrid } from "@chakra-ui/react";
import { HiChartBar } from "react-icons/hi";
import { KooizButton } from "../components/KooizButton";
import { KooizTitle } from "../components/KooizTitle";

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
        <KooizTitle>Witch topic?</KooizTitle>

        <RadioGroup.Root
          value={selectCategoryId}
          onValueChange={(e) => setSelectCategoryId(e.value ?? "")}
          display={"flex"}
          justifyContent={"center"}
        >
          <SimpleGrid columns={[3, null, 4]} gap="20px">
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

      <KooizButton
        onClickNext={() => p.onClickNext(selectCategoryId)}
        icon={HiChartBar}
      />
    </>
  );
}
