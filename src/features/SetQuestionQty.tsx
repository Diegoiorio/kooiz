import { Button, Flex, Heading, Slider } from "@chakra-ui/react";
import { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { HiOutlineCube } from "react-icons/hi";

interface Props {
  max: number;
  min: number;
  step: number;
  defaultValue: number;
  onClickNext: (amount: number) => void;
}

type mark = {
  value: number;
  label: string;
};

export default function SetQuestionQty(p: Props) {
  const [sliderValue, setSliderValue] = useState<number>(p.defaultValue);

  // Calculate marks directly in the component
  const marks: mark[] = [];
  let min = p.min;
  while (min <= p.max) {
    marks.push({ value: min, label: min.toString() });
    min += p.step;
  }

  return (
    <>
      <Flex direction="column" alignItems="center">
        <Heading as="h1" fontSize="3xl" mb={20}>
          How many questions?
        </Heading>

        <Slider.Root
          width={400}
          max={p.max}
          min={p.min}
          step={p.step}
          colorPalette="teal"
          defaultValue={[sliderValue]}
          onValueChange={(details) => {
            setSliderValue(details.value[0]); // details.value is number[]
          }}
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
            <Slider.Marks marks={marks} />
          </Slider.Control>
        </Slider.Root>
      </Flex>

      <Flex direction="column" alignItems="center">
        <Button
          onClick={() => p.onClickNext(sliderValue)}
          position="absolute"
          top="80%"
        >
          Set Category
          <Icon size="lg">
            <HiOutlineCube />
          </Icon>
        </Button>
      </Flex>
    </>
  );
}
