import { QRCodeCell, QRCodeColorCell, QRCodeGrid } from "@/types";

const isQRCodeColorCell = (
  qrCodeCell: QRCodeCell
): qrCodeCell is QRCodeColorCell => {
  return qrCodeCell.type === "color";
};

export const calcQRCodeStat = (qrCodeGrid: QRCodeGrid | null) => {
  if (!qrCodeGrid) {
    return {
      deletedColorCellCount: 0,
      deletedColorCellPercent: 0,
    };
  }
  const qrCodeColorCells = qrCodeGrid.flat().filter(isQRCodeColorCell);
  const initialBlackCells = qrCodeColorCells.filter(
    (cell) => cell.initialColor === "black"
  );
  const deletedBlackCells = initialBlackCells.filter(
    (cell) => cell.color === "white"
  );
  return {
    deletedColorCellCount: deletedBlackCells.length,
    deletedColorCellPercent:
      Math.floor(
        (deletedBlackCells.length / initialBlackCells.length) * 10000
      ) / 100,
  };
};
