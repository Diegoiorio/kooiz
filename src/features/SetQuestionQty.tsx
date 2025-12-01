import { Flex, Slider } from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineCube } from "react-icons/hi";
import { KooizButton } from "../components/KooizButton";
import type { mark, QtyProps } from "../types/quis-types";
import { KooizTitle } from "../components/KooizTitle";

export default function SetQuestionQty(p: QtyProps) {
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
        <KooizTitle>How many questions?</KooizTitle>

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

      <KooizButton
        onClickNext={() => p.onClickNext(sliderValue)}
        icon={HiOutlineCube}
      />
    </>
  );
}
