import { Heading } from "@chakra-ui/react";

export function KooizTitle(p: { children: string }) {
  return (
    <Heading as="h1" fontSize="3xl" mb={10}>
      {p.children}
    </Heading>
  );
}
