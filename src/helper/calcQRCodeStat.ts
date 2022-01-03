import { QRCodeCell, QRCodeColorCell, QRCodeGrid } from "@/types";

const isQRCodeColorCell = (
  qrCodeCell: QRCodeCell
): qrCodeCell is QRCodeColorCell => {
  return qrCodeCell.type === "color";
};

export const calcQRCodeStat = (qrCodeGrid: QRCodeGrid | null) => {
  if (!qrCodeGrid) {
    return {
      reversedBlackCellCount: 0,
      reversedBlackCellPercent: 0,
      initialBlackCellCount: 0,
    };
  }
  const qrCodeColorCells = qrCodeGrid.flat().filter(isQRCodeColorCell);
  const initialBlackCells = qrCodeColorCells.filter(
    (cell) => cell.initialColor === "black"
  );
  const reversedBlackCells = initialBlackCells.filter(
    (cell) => cell.color === "white"
  );
  return {
    reversedBlackCellCount: reversedBlackCells.length,
    reversedBlackCellPercent:
      Math.floor(
        (reversedBlackCells.length / initialBlackCells.length) * 10000
      ) / 100,
    initialBlackCellCount: initialBlackCells.length,
  };
};
