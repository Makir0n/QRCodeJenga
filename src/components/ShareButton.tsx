import React from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  LinkBox,
  Button,
  LinkOverlay,
} from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";

const SHARE_CONTENT = {
  text: "QRコードジェンガ",
  url: "https://makir0n.github.io/QRCodeJenga/",
  twitterHashTag: "QRコードジェンガ",
};

const createTwitterShareUrl = (text: string, url: string, hashtag: string) => {
  const twitterShareUrl = new URL("http://twitter.com/share");
  twitterShareUrl.searchParams.append("url", url);
  twitterShareUrl.searchParams.append("text", text);
  twitterShareUrl.searchParams.append("hashtags", hashtag);
  return twitterShareUrl.href;
};

export const ShareButton = () => {
  const twitterShareUrl = createTwitterShareUrl(
    SHARE_CONTENT.text,
    SHARE_CONTENT.url,
    SHARE_CONTENT.twitterHashTag
  );

  return (
    <Box>
      <Center>
        <VStack spacing="5px">
          <Text color="white" fontSize="12px" lineHeight="12px">
            {"＼Twitterでシェア！／"}
          </Text>
          <LinkBox>
            <Button
              variant="solid"
              size="xs"
              colorScheme="twitter"
              leftIcon={<FaTwitter />}
            >
              <LinkOverlay isExternal={true} href={twitterShareUrl}>
                ツイート
              </LinkOverlay>
            </Button>
          </LinkBox>
        </VStack>
      </Center>
    </Box>
  );
};
