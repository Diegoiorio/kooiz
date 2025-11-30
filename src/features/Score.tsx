import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { number } from "framer-motion";
import { HiPlay } from "react-icons/hi";

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
      <Heading fontSize={"3xl"} mt={100} mb={20}>
        Score
      </Heading>
      <Heading fontSize={"xl"} mt={"5"}>
        {rightAnswers}/{p.history.length}
      </Heading>
      <Text fontWeight={"bold"} mt={10}>
        {renderMessage()}
      </Text>

      <Flex direction="column" alignItems="center">
        <Button position="absolute" top="80%" onClick={() => p.onNext()}>
          New Game!
          <Icon size="lg">
            <HiPlay />
          </Icon>
        </Button>
      </Flex>
    </Flex>
  );
}
