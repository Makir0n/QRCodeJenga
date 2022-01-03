import React, { useEffect, useState } from "react";
import type { QRCodeColorGrid, QRCodeGrid } from "@/types";
import { createQRCodeGrid } from "@/helper/createQRCodeGrid";
import { calcQRCodeStat } from "@/helper/calcQRCodeStat";
import { Box, Flex } from "@chakra-ui/react";

const BOX_SIZE = 15;
const ROW_LABEL_WIDTH = 20;
const COLUMN_LABEL_HEIGHT = 20;

export const QRCodeEditor = ({
  qrCodeColorGrid,
}: {
  qrCodeColorGrid: QRCodeColorGrid | null;
}) => {
  const [qrCodeGrid, setQRCodeGrid] = useState<QRCodeGrid | null>(null);
  useEffect(() => {
    if (qrCodeColorGrid) {
      setQRCodeGrid(createQRCodeGrid(qrCodeColorGrid));
    } else {
      setQRCodeGrid(null);
    }
  }, [qrCodeColorGrid]);
  const handleClickColorCell = (x: number, y: number) => {
    const qrCodeCell = qrCodeGrid?.[y][x];
    if (!qrCodeCell || qrCodeCell.type !== "color") {
      return;
    }
    const newQRCodeGrid = [...qrCodeGrid];
    newQRCodeGrid[y][x] = {
      ...qrCodeCell,
      color: qrCodeCell.color === "white" ? "black" : "white",
    } as const;
    setQRCodeGrid(newQRCodeGrid);
  };
  const width = qrCodeGrid
    ? `${qrCodeGrid[0].length * BOX_SIZE + ROW_LABEL_WIDTH}px`
    : 0;
  const height = qrCodeGrid
    ? `${qrCodeGrid.length * BOX_SIZE + COLUMN_LABEL_HEIGHT}px`
    : 0;

  const { deletedColorCellCount, deletedColorCellPercent } =
    calcQRCodeStat(qrCodeGrid);

  return (
    qrCodeGrid && (
      <Flex
        flexDirection={"column"}
        justify={"center"}
        align={"center"}
        minH={"100%"}
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
                        >
                          {qrCodeCell.text}
                        </Box>
                      );
                    case "rowLabel":
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
                        >
                          {qrCodeCell.text}
                        </Box>
                      );
                    case "color":
                      return (
                        <Box
                          w={`${BOX_SIZE}px`}
                          h={`${BOX_SIZE}px`}
                          onClick={() => handleClickColorCell(x, y)}
                          key={x}
                          bg={qrCodeCell.color}
                        />
                      );
                  }
                })}
              </Flex>
            );
          })}
        </Flex>
        <Box textAlign="center">
          消した黒マス: {deletedColorCellCount}個<br />
          破壊率: {deletedColorCellPercent}%
        </Box>
      </Flex>
    )
  );
};
