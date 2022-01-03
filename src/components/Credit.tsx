import React from "react";
import { Box, Center, VStack, Text, Link } from "@chakra-ui/react";

export const Credit = () => {
  return (
    <Box>
      <Center>
        <VStack spacing="3px" color="gray.400" fontSize="10px">
          <Text>
            <Link href="privacy.html" textDecoration="underline">
              プライバシーポリシー
            </Link>
          </Text>
          <Text>
            企画、デザイン:{" "}
            <Link
              href="https://twitter.com/Makir0n"
              isExternal={true}
              textDecoration="underline"
            >
              @Makir0n
            </Link>{" "}
            開発:{" "}
            <Link
              href="https://twitter.com/asakura_dev"
              isExternal={true}
              textDecoration="underline"
            >
              @asakura_dev
            </Link>
          </Text>
          <Text>QRコードは(株)デンソーウェーブの登録商標です</Text>
        </VStack>
      </Center>
    </Box>
  );
};
