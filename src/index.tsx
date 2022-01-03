import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { QRCodeEditor } from "./components/QrCodeEditor";
import { createQRCodeColorGrid } from "./helper/createQRCodeColorGrid";
import { QRCodeColorGrid } from "./types";
import { ShareButton } from "./components/ShareButton";
import { Credit } from "./components/Credit";
import { QRCodeCreateForm } from "./components/QRCodeCreateForm";
import { Description } from "./components/Description";

const DEFAULT_QR_CODE_TEXT = "SUCCESS!";

const App = () => {
  const [qrCodeColorGrid, setQRCodeColorGrid] =
    useState<QRCodeColorGrid | null>(null);
  const updateQRCodeGrid = (text: string) => {
    createQRCodeColorGrid(text).then((qrCodeColorGrid) => {
      setQRCodeColorGrid(qrCodeColorGrid);
    });
  };
  // on mount
  useEffect(() => {
    updateQRCodeGrid(DEFAULT_QR_CODE_TEXT);
  }, []);

  return (
    <ChakraProvider>
      <Flex
        minH={"100vh"}
        direction={["column-reverse", "column-reverse", "row"]}
      >
        <Box w={"100%"} p={"20px"}>
          <QRCodeEditor qrCodeColorGrid={qrCodeColorGrid} />
        </Box>
        <Box
          w={"100%"}
          p={"20px"}
          bg={
            "linear-gradient(to top, #5e492c 10%,#57392f 20%,#481b18 40%,#1e0606 80%,#1a0806 100%)"
          }
          bgSize={"cover"}
        >
          <Flex flexDirection={"column"} justify={"center"} minH={"100%"}>
            <Box mt="20px">
              <Description />
            </Box>
            <Box mt="40px">
              <QRCodeCreateForm
                defaultText={DEFAULT_QR_CODE_TEXT}
                onSubmit={(text) => {
                  updateQRCodeGrid(text);
                }}
              />
            </Box>
            <Box mt="40px">
              <ShareButton />
            </Box>
            <Box mt="20px">
              <Credit />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
ReactDom.render(<App />, document.getElementById("app"));
