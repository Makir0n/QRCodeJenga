import React, { useEffect, useState } from "react";
import type { QRCodeColorGrid, QRCodeGrid } from "@/types";
import { createQRCodeGrid } from "@/helper/createQRCodeGrid";
import { calcQRCodeStat } from "@/helper/calcQRCodeStat";

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
      <React.Fragment>
        <div className="rows" style={{ width, height }}>
          {qrCodeGrid.map((row, y) => {
            return (
              <div className="row" style={{ width }} key={y}>
                {row.map((qrCodeCell, x) => {
                  switch (qrCodeCell.type) {
                    case "corner":
                      return <div className="corner" key={x}></div>;
                    case "columnLabel":
                      return (
                        <div className="column-label" key={x}>
                          {qrCodeCell.text}
                        </div>
                      );
                    case "rowLabel":
                      return (
                        <div className="row-label" key={x}>
                          {qrCodeCell.text}
                        </div>
                      );
                    case "color":
                      return (
                        <div
                          className="box"
                          data-initial-color={qrCodeCell.initialColor}
                          data-color={qrCodeCell.color}
                          onClick={() => handleClickColorCell(x, y)}
                          key={x}
                        ></div>
                      );
                  }
                })}
              </div>
            );
          })}
        </div>
        <div className="deleted-block">
          消した黒マス: {deletedColorCellCount}個<br />
          破壊率: {deletedColorCellPercent}%
        </div>
      </React.Fragment>
    )
  );
};
