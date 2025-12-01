import { AbsoluteCenter, ProgressCircle } from "@chakra-ui/react";
import { useEffect, useState } from "react";
let timer: number;

export function Timer(p: { max: number; onFinished: () => void }) {
  const [progress, setProgress] = useState<number>(p.max);

  useEffect(() => {
    timer = setInterval(() => {
      setProgress((prevProgress: number) => prevProgress - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress <= 0) {
      p.onFinished();
      clearInterval(timer);
    }
  }, [p, progress]);

  return (
    <ProgressCircle.Root value={progress} max={p.max}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range />
      </ProgressCircle.Circle>
      <AbsoluteCenter>
        <ProgressCircle.ValueText>{progress}'</ProgressCircle.ValueText>
      </AbsoluteCenter>
    </ProgressCircle.Root>
  );
}
