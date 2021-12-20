import QRCode from "qrcode";

const COLOR = {
  WHITE: "white",
  BLACK: "black",
};

var deletedBockCounter = 0;

const updateDeletedBlockCounter = (num) => {
  deletedBockCounter = num;
  const counterElem = document.getElementById("deleted-block-count");
  counterElem.innerText = deletedBockCounter;
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
  for (let y = 0; y < canvas.height; y++) {
    const row = [];
    for (let x = 0; x < canvas.width; x++) {
      const pixel = ctx.getImageData(x, y, 1, 1);
      const pixelValue = pixel.data[0] === 0 ? COLOR.BLACK : COLOR.WHITE;
      row.push(pixelValue);
    }
    rows.push(row);
  }
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
  qrCodeArray.forEach((row) => {
    const rowElem = createDivElement("row");
    row.forEach((colorText) => {
      const boxElem = createDivElement("box");
      boxElem.setAttribute("data-color", colorText);
      boxElem.setAttribute("data-initial-color", colorText);
      rowElem.appendChild(boxElem);
    });
    rowElem.setAttribute("style", `width: ${row.length * 10}px`);
    rowsElem.appendChild(rowElem);
  });
  const width = `${qrCodeArray[0].length * 10}px`;
  const height = `${qrCodeArray.length * 10}px`;
  rowsElem.setAttribute("style", `width: ${width}; height: ${height}`);
  return rowsElem;
};

const reverseBoxColor = (elem) => {
  const nextColor =
    elem.getAttribute("data-color") === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE;
  elem.setAttribute("data-color", nextColor);
  if (elem.getAttribute("data-initial-color") === COLOR.BLACK) {
    if (nextColor === COLOR.WHITE) {
      updateDeletedBlockCounter(deletedBockCounter + 1);
    } else {
      updateDeletedBlockCounter(deletedBockCounter - 1);
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
    updateDeletedBlockCounter(0);
    createQRCodeArray(text).then((qrCodeArray) => {
      const qrCodeElement = createQRCodeElement(qrCodeArray);
      container.appendChild(qrCodeElement);
      setOnClickBoxes(qrCodeElement);
    });
  };
  createButton.addEventListener("click", createQRCodeFromInputValue);

  // Create default qr code
  createQRCodeFromInputValue();
};

main();
