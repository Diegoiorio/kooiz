import { Flex, Heading, Slider } from "@chakra-ui/react";
import { useMemo, useState } from "react";

interface Props {
  max: number;
  min: number;
  step: number;
  defaultValue: number;
}

type mark = {
  value: number;
  label: string;
};

export default function SetQuestionQty(p: Props) {
  const [sliderValue, setSliderValue] = useState<number>(p.defaultValue);

  // Calculate marks without any state (is not necessary)
  const marks: mark[] = useMemo(() => {
    const res: mark[] = [];
    let min = p.min;

    while (min <= p.max) {
      res.push({ value: min, label: min.toString() });
      min += p.step;
    }

    return res;
  }, [p.max, p.min, p.step]);

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
          onChange={(val) => setSliderValue(val)}
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
    </>
  );
}
