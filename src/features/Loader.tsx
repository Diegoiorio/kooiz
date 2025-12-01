import { Flex, Spinner } from "@chakra-ui/react";

export function Loader() {
  return (
    <Flex
      top={0}
      position={"absolute"}
      justify={"center"}
      alignItems={"center"}
      minH={"100vh"}
      width={"100%"}
    >
      <Spinner />
    </Flex>
  );
}
