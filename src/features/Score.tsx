import { Flex, Heading, Text } from "@chakra-ui/react";
import { HiPlay } from "react-icons/hi";
import { KooizButton } from "../components/KooizButton";
import { KooizTitle } from "../components/KooizTitle";

export function Score(p: { history: boolean[]; onNext: () => void }) {
  const rightAnswers = p.history.filter(
    (isCorrect: boolean) => isCorrect === true
  ).length;

  const renderMessage = () => {
    const rightAnswersPercentege: number =
      (rightAnswers * 100) / p.history.length;

    if (rightAnswersPercentege < 30) {
      return "You need more pratice!";
    } else if (rightAnswersPercentege < 50) {
      return "Not bad! Keep training youself";
    } else if (rightAnswersPercentege < 75) {
      return "Good Job!";
    } else {
      return "You are my master!";
    }
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      margin={"auto"}
      width={"80%"}
    >
      <KooizTitle>Score</KooizTitle>

      <Heading fontSize={"xl"} mt={"5"}>
        {rightAnswers}/{p.history.length}
      </Heading>
      <Text fontWeight={"bold"} mt={10}>
        {renderMessage()}
      </Text>

      <KooizButton onClickNext={() => p.onNext()} icon={HiPlay} />
    </Flex>
  );
}
