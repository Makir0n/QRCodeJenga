import QRCode from "qrcode";

const COLOR = {
  WHITE: "white",
  BLACK: "black",
};

const BOX_SIZE = 15;
const ROW_LABEL_WIDTH = 20;
const COLUMN_LABEL_HEIGHT = 20;

let initialBlackBoxNum = 0;
let deletedBlackBoxCount = 0;

const updateStat = (newDeletedBlackBoxCount) => {
  deletedBlackBoxCount = newDeletedBlackBoxCount;
  const counterElem = document.getElementById("deleted-block-count");
  if (counterElem) {
    counterElem.innerText = deletedBlackBoxCount;
  }
  const percentElem = document.getElementById("deleted-block-percent");
  if (percentElem) {
    percentElem.innerText = `破壊率: ${
      Math.floor((deletedBlackBoxCount / initialBlackBoxNum) * 10000) / 100
    }%`;
  }
};

/**
 * Return qr code as a two-dimensional array
 * const rows = [
 *   ['white', 'black', ...], // row
 *   ['white', 'black', ...],
 *   ['black', 'white', ...],
 * ]
 * @param {string} text
 * @returns Promise<string[][]>
 */
const createQRCodeArray = async (text) => {
  const canvas = document.createElement("canvas");
  // https://www.npmjs.com/package/qrcode#qr-code-options
  await QRCode.toCanvas(canvas, text, { scale: 1, margin: 0 });
  const ctx = canvas.getContext("2d");
  const rows = [];
  let boxNum = 0;
  for (let y = 0; y < canvas.height; y++) {
    const row = [];
    for (let x = 0; x < canvas.width; x++) {
      const pixel = ctx.getImageData(x, y, 1, 1);
      const isBlack = pixel.data[0] === 0;
      const pixelValue = isBlack ? COLOR.BLACK : COLOR.WHITE;
      if (isBlack) {
        boxNum += 1;
      }
      row.push(pixelValue);
    }
    rows.push(row);
  }
  initialBlackBoxNum = boxNum;
  return rows;
};

/**
 * @param {string} className
 * @returns HTMLDivElement
 */
const createDivElement = (className) => {
  const divElem = document.createElement("div");
  divElem.classList.add(className);
  return divElem;
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const getColumnLabel = (number) => {
  const secondDigitCharAt = number / 26 - 1;
  const firstDigitCharAt = number % 26;
  const secondDigitChar =
    secondDigitCharAt >= 0 ? ALPHABET.charAt(secondDigitCharAt) : "";
  const firstDigitChar = ALPHABET.charAt(firstDigitCharAt);
  return `${secondDigitChar}${firstDigitChar}`;
};

/**
 * Generate qr code element from qrCodeArray
 * DOM Tree
 * <div class='rows'>
 *   <div class='row'>
 *     <div class='box' data-color='white'/>
 *     <div class='box' data-color='black'/>
 *     ...
 *   </div>
 *   ...
 * </div>
 * @param {*} qrCodeArray
 * @returns
 */
const createQRCodeElement = (qrCodeArray) => {
  const rowsElem = createDivElement("rows");
  // 1行目 列ラベルの追加
  const columnLabelRowElem = createDivElement("row");
  const cornerElem = createDivElement("corner");
  columnLabelRowElem.appendChild(cornerElem);
  for (let i = 0; i < qrCodeArray[0].length; i++) {
    const columnLabelElem = createDivElement("column-label");
    columnLabelElem.innerText = getColumnLabel(i);
    columnLabelRowElem.appendChild(columnLabelElem);
  }
  rowsElem.appendChild(columnLabelRowElem);
  // 行ラベル + QRコードの追加
  qrCodeArray.forEach((row, index) => {
    const rowElem = createDivElement("row");
    // 行ラベルの追加
    const rowLabelElem = createDivElement("row-label");
    rowLabelElem.innerText = `${index + 1}`;
    rowElem.appendChild(rowLabelElem);
    row.forEach((colorText) => {
      const boxElem = createDivElement("box");
      boxElem.setAttribute("data-color", colorText);
      boxElem.setAttribute("data-initial-color", colorText);
      rowElem.appendChild(boxElem);
    });
    rowElem.setAttribute(
      "style",
      `width: ${row.length * BOX_SIZE + ROW_LABEL_WIDTH} px`
    );
    rowsElem.appendChild(rowElem);
  });
  const width = `${qrCodeArray[0].length * BOX_SIZE + ROW_LABEL_WIDTH}px`;
  const height = `${qrCodeArray.length * BOX_SIZE + COLUMN_LABEL_HEIGHT}px`;
  rowsElem.setAttribute(
    "style",
    `width: ${width}; height: ${height}; padding: 0px ${ROW_LABEL_WIDTH}px ${COLUMN_LABEL_HEIGHT}px 0px`
  );
  return rowsElem;
};

const reverseBoxColor = (elem) => {
  const nextColor =
    elem.getAttribute("data-color") === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;
  elem.setAttribute("data-color", nextColor);
  if (elem.getAttribute("data-initial-color") === COLOR.BLACK) {
    if (nextColor === COLOR.WHITE) {
      updateStat(deletedBlackBoxCount + 1);
    } else {
      updateStat(deletedBlackBoxCount - 1);
    }
  }
};

/**
 * Set event handler to `.box` elements
 * @param {HTMLDivElement} qrCodeElement - 検索対象のDOM
 */
const setOnClickBoxes = (qrCodeElement) => {
  const boxElements = Array.from(qrCodeElement.querySelectorAll(".box"));
  boxElements.forEach((boxElem) => {
    boxElem.addEventListener("click", (event) => {
      const elem = event.target;
      reverseBoxColor(elem);
    });
  });
};

const removeChildren = (targetElem) => {
  const children = targetElem.children;
  if (children) {
    Array.from(children).forEach((elem) => {
      targetElem.removeChild(elem);
    });
  }
};

const main = () => {
  // 作成ボタン
  const createButton = document.getElementById("create-button");
  // 入力フォーム
  const createInput = document.getElementById("create-input");
  // qrCodeElementを追加する対象コンテナ
  const container = document.getElementById("container");

  const createQRCodeFromInputValue = () => {
    const text = createInput.value;
    if (text === "") {
      window.alert("テキストを入力してください");
      return;
    }
    removeChildren(container);
    createQRCodeArray(text).then((qrCodeArray) => {
      const qrCodeElement = createQRCodeElement(qrCodeArray);
      container.appendChild(qrCodeElement);
      setOnClickBoxes(qrCodeElement);
      updateStat(0);
    });
  };
  createButton.addEventListener("click", createQRCodeFromInputValue);

  // Create default qr code
  createQRCodeFromInputValue();
};

main();
