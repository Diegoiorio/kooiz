import { Button, Flex, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";

export function KooizButton(p: { onClickNext: () => void; icon: IconType }) {
  return (
    <Flex direction="column" alignItems="center">
      <Button onClick={p.onClickNext} position="absolute" top="80%">
        Set Category
        <Icon size="lg">
          <p.icon />
        </Icon>
      </Button>
    </Flex>
  );
}
