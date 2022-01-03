// https://www.npmjs.com/package/qrcode
// https://www.npmjs.com/package/qrcode#qr-code-options
import { toCanvas } from "qrcode";
import type { QRCodeColorCell, QRCodeColorGrid } from "@/types";

/**
 * Return qr code as a two-dimensional array
 * @param text
 */
export const createQRCodeColorGrid = async (text: string) => {
  const canvas = document.createElement("canvas");
  await toCanvas(canvas, text, { scale: 1, margin: 0 });
  const canvasContext = canvas.getContext("2d");
  if (canvasContext === null) {
    throw new Error("canvasContext is null");
  }
  const qrCodeColorGrid: QRCodeColorGrid = [];
  for (let y = 0; y < canvas.height; y++) {
    const row: QRCodeColorCell[] = [];
    for (let x = 0; x < canvas.width; x++) {
      const imageData = canvasContext.getImageData(x, y, 1, 1);
      const isBlack = imageData.data[0] === 0;
      const color = isBlack ? "black" : "white";
      row.push({
        type: "color",
        color,
        initialColor: color,
      });
    }
    qrCodeColorGrid.push(row);
  }
  return qrCodeColorGrid;
};
