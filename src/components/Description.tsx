import React from "react";
import { Container, Flex, Heading } from "@chakra-ui/react";

const FONTS = {
  ROCKN_ROLE_ONE: "'RocknRoll One', sans-serif",
  ZEN_ANTIQUE_SOFT: "'Zen Antique Soft', serif",
};

export const Description = () => {
  return (
    <Flex direction="column">
      <Heading
        as="h1"
        size="lg"
        color="yellow.300"
        textAlign="center"
        fontFamily={FONTS.ROCKN_ROLE_ONE}
      >
        QRコードジェンガ
      </Heading>
      <Container
        mt="30px"
        color="yellow.300"
        textAlign="center"
        fontFamily={FONTS.ZEN_ANTIQUE_SOFT}
      >
        1人〜7人程度までで遊べるパーティーゲーム。
        <br />
        みんなで順番にQRコードを1マスずつ白く塗りつぶして読み取れなくなった人の負け！
      </Container>
      <Heading
        mt="30px"
        as="h2"
        size="md"
        color="#92248a"
        textAlign="center"
        fontFamily={FONTS.ROCKN_ROLE_ONE}
      >
        遊び方
      </Heading>
      <Container
        mt="20px"
        fontSize="16px"
        color="#feffff"
        fontFamily={FONTS.ZEN_ANTIQUE_SOFT}
      >
        ① はじめにスマホのQRコードリーダー（例：Google
        レンズ）を準備します。QRコードリーダーでQRコードが読み取れることを確認しましょう。
        <br />
        ②
        QRコードの黒いマスをタップ(クリック)すると白く塗りつぶすことができます。プレイヤーは1マスずつ白く塗りつぶします。
        <br />
        ③
        1マス塗りつぶすごとにQRコードリーダーで読み取れるかを確認します。読み取れれば次のプレイヤーに交代します。
        <br />
        ④
        これをQRコードが読み取れなくなるまで繰り返します。最初に読み取れなくした人の負けです。
        <br />
        <br />
        (やり直したい人のために白マスをタップしても黒マスに反転します)
      </Container>
    </Flex>
  );
};
