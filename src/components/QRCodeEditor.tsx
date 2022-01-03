import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import type { QRCodeColorGrid, QRCodeGrid } from "@/types";
import { createQRCodeGrid } from "@/helper/createQRCodeGrid";
import { calcQRCodeStat } from "@/helper/calcQRCodeStat";
import { oppositeColor } from "@/helper/color";
import { useQRCodeHistory } from "@/hooks/useQRCodeHistory";
import { Setting, SettingDrawer } from "./SettingDrawer";

const BOX_SIZE = 15;
const ROW_LABEL_WIDTH = 20;
const COLUMN_LABEL_HEIGHT = 20;

export const QRCodeEditor = ({
  qrCodeColorGrid,
}: {
  qrCodeColorGrid: QRCodeColorGrid | null;
}) => {
  const [initialQRCodeGrid, setInitialQRCodeGrid] = useState<QRCodeGrid | null>(
    null
  );
  useEffect(() => {
    if (qrCodeColorGrid) {
      setInitialQRCodeGrid(createQRCodeGrid(qrCodeColorGrid));
    } else {
      setInitialQRCodeGrid(null);
    }
  }, [qrCodeColorGrid]);
  /**
   * Setting Drawer
   */
  const [setting, setSetting] = useState<Setting>({
    disableEditWhiteCell: false,
  });
  const handleOnChangeSetting = (partialSetting: Partial<Setting>) => {
    setSetting({
      ...setting,
      ...partialSetting,
    });
  };

  /**
   * History Feature(Undo/Redo)
   */
  const { qrCodeGrid, action, availableRedo, availableUndo } =
    useQRCodeHistory(initialQRCodeGrid);
  const { recordCommand, undo, redo } = action;

  const handleClickColorCell = (x: number, y: number) => {
    const qrCodeCell = qrCodeGrid?.[y][x];
    if (!qrCodeCell || qrCodeCell.type !== "color") {
      return;
    }
    if (qrCodeCell.color === "white" && setting.disableEditWhiteCell) {
      return;
    }
    recordCommand({
      type: "changeColorCommand",
      x,
      y,
      color: oppositeColor(qrCodeCell.color),
    });
  };
  const width = qrCodeGrid
    ? `${qrCodeGrid[0].length * BOX_SIZE + ROW_LABEL_WIDTH}px`
    : 0;
  const height = qrCodeGrid
    ? `${qrCodeGrid.length * BOX_SIZE + COLUMN_LABEL_HEIGHT}px`
    : 0;

  /**
   * MouseOver Guide
   */
  const [currentMouseOverPosition, setCurrentMouseOverPosition] = useState<{
    x: number;
    y: number;
  }>({ x: -1, y: -1 });
  const handleMouseOver = (x: number, y: number) => {
    setCurrentMouseOverPosition({ x, y });
  };
  const handleMouseOut = () => {
    setCurrentMouseOverPosition({ x: -1, y: -1 });
  };

  /**
   * Stat
   */
  const {
    initialBlackCellCount,
    reversedBlackCellCount,
    reversedBlackCellPercent,
  } = calcQRCodeStat(qrCodeGrid);
  return (
    qrCodeGrid && (
      <Flex direction="column" minH="100%">
        <Box flexGrow="0">
          <SettingDrawer
            setting={setting}
            onChangeSetting={handleOnChangeSetting}
          />
        </Box>
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          flexGrow="1"
        >
          <Flex direction={"column"} width={width} height={height}>
            {qrCodeGrid.map((row, y) => {
              return (
                <Flex direction={"row"} width={width} key={y}>
                  {row.map((qrCodeCell, x) => {
                    switch (qrCodeCell.type) {
                      case "corner":
                        return (
                          <Box
                            w={`${ROW_LABEL_WIDTH}px`}
                            h={`${COLUMN_LABEL_HEIGHT}px`}
                            key={x}
                          />
                        );
                      case "columnLabel":
                        const isActiveColumn = currentMouseOverPosition.x === x;
                        return (
                          <Box
                            w={`${BOX_SIZE}px`}
                            h={`${COLUMN_LABEL_HEIGHT}px`}
                            key={x}
                            lineHeight="7px"
                            py="7px"
                            fontSize="7px"
                            textAlign="center"
                            verticalAlign="middle"
                            color="gray.600"
                            background={isActiveColumn ? "orange.100" : "white"}
                          >
                            {qrCodeCell.text}
                          </Box>
                        );
                      case "rowLabel":
                        const isActiveRow = currentMouseOverPosition.y === y;
                        return (
                          <Box
                            w={`${ROW_LABEL_WIDTH}px`}
                            h={`${BOX_SIZE}px`}
                            key={x}
                            lineHeight={`${BOX_SIZE}px`}
                            fontSize="7px"
                            textAlign="center"
                            verticalAlign="middle"
                            color="gray.600"
                            background={isActiveRow ? "orange.100" : "white"}
                          >
                            {qrCodeCell.text}
                          </Box>
                        );
                      case "color":
                        const isActiveCell =
                          currentMouseOverPosition.y === y &&
                          currentMouseOverPosition.x === x;
                        return (
                          <Box
                            w={`${BOX_SIZE}px`}
                            h={`${BOX_SIZE}px`}
                            onClick={() => handleClickColorCell(x, y)}
                            onMouseOver={() => handleMouseOver(x, y)}
                            onMouseOut={() => handleMouseOut()}
                            onMouseUp={() => handleMouseOut()}
                            key={x}
                            bg={qrCodeCell.color}
                            border={isActiveCell ? "1px solid #FEEBC8" : "none"}
                          />
                        );
                    }
                  })}
                </Flex>
              );
            })}
          </Flex>
          <Box>
            <Button
              size="sm"
              mb="20px"
              disabled={!availableUndo}
              onClick={undo}
            >
              <AiFillCaretLeft />
            </Button>
            <Button
              size="sm"
              mb="20px"
              ml="15px"
              disabled={!availableRedo}
              onClick={redo}
            >
              <AiFillCaretRight />
            </Button>
          </Box>
          <Box>
            <StatGroup>
              <Stat>
                <StatLabel>消した黒マス</StatLabel>
                <StatNumber>
                  {reversedBlackCellCount}/{initialBlackCellCount}
                </StatNumber>
                <StatHelpText>{reversedBlackCellPercent}%</StatHelpText>
              </Stat>
            </StatGroup>
          </Box>
        </Flex>
      </Flex>
    )
  );
};
