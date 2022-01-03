import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";

export const QRCodeCreateForm = ({
  defaultText,
  onSubmit,
}: {
  defaultText: string;
  onSubmit: (nextValue: string) => void;
}) => {
  const [inputText, setInputText] = useState<string>(defaultText);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  const clearText = () => {
    setInputText("");
  };
  const handleClickButton = () => {
    if (inputText.length === 0) {
      window.alert("テキストを入力してください");
      return;
    }
    onSubmit(inputText);
  };
  return (
    <Center>
      <HStack maxWidth="300px">
        <InputGroup size="sm">
          <Input
            bg="#fff"
            type="text"
            value={inputText}
            onChange={handleInputChange}
          />
          {inputText.length > 0 && (
            <InputRightElement>
              <Box color="gray.500">
                <TiDelete size="20px" onClick={clearText} />
              </Box>
            </InputRightElement>
          )}
        </InputGroup>
        <Button
          bg="yellow.300"
          color="#111"
          size="sm"
          w="160px"
          _hover={{ bg: "yellow.400" }}
          _active={{ bg: "yellow.400" }}
          fontSize="12px"
          onClick={handleClickButton}
          disabled={inputText.length === 0}
        >
          QRコードを作成
        </Button>
      </HStack>
    </Center>
  );
};
