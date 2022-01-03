import type {
  QRCodeCell,
  QRCodeColumnLabelCell,
  QRCodeRowLabelCell,
  QRCodeColorGrid,
  QRCodeGrid,
} from "@/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/**
 * Return column label
 * @example
 *   getColumnLabel(0)  // return 'A'
 *   getColumnLabel(25) // return 'Z'
 *   getColumnLabel(26) // return 'AA'
 * @param index
 */
const getColumnLabel = (index: number) => {
  const secondDigitCharAt = index / ALPHABET.length - 1;
  const firstDigitCharAt = index % ALPHABET.length;
  const secondDigitChar =
    secondDigitCharAt >= 0 ? ALPHABET.charAt(secondDigitCharAt) : "";
  const firstDigitChar = ALPHABET.charAt(firstDigitCharAt);
  return `${secondDigitChar}${firstDigitChar}`;
};

const createHeaderRow = (qrCodeColorRowLength: number): QRCodeCell[] => {
  const columnLabelCells = [
    ...Array(qrCodeColorRowLength),
  ].map<QRCodeColumnLabelCell>((_, index) => {
    return {
      type: "columnLabel",
      text: getColumnLabel(index),
    };
  });
  return [{ type: "corner" }, ...columnLabelCells];
};

export const createQRCodeGrid = (
  qrCodeColorGrid: QRCodeColorGrid
): QRCodeGrid => {
  return [
    // 1行目: 列ラベル
    createHeaderRow(qrCodeColorGrid[0].length),
    // 2行目以降: 行ラベル + QRコード
    ...qrCodeColorGrid.map((qrCodeColorRow, index) => {
      const rowLabelCell: QRCodeRowLabelCell = {
        type: "rowLabel",
        text: `${index + 1}`,
      };
      return [rowLabelCell, ...qrCodeColorRow];
    }),
  ];
};
