export type COLOR = "white" | "black";

export type QRCodeCell =
  | QRCodeColorCell
  | QRCodeCornerCell
  | QRCodeColumnLabelCell
  | QRCodeRowLabelCell;

export type QRCodeColorCell = {
  type: "color";
  color: COLOR;
  initialColor: COLOR;
};
export type QRCodeCornerCell = {
  type: "corner";
};
export type QRCodeColumnLabelCell = {
  type: "columnLabel";
  text: string;
};
export type QRCodeRowLabelCell = {
  type: "rowLabel";
  text: string;
};

export type QRCodeColorGrid = QRCodeColorCell[][];
export type QRCodeGrid = QRCodeCell[][];
