import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { QRCodeEditor } from "./components/QrCodeEditor";
import { createQRCodeColorGrid } from "./helper/createQRCodeColorGrid";
import { QRCodeColorGrid } from "./types";

const App = () => {
  const [qrCodeColorGrid, setQRCodeColorGrid] =
    useState<QRCodeColorGrid | null>(null);
  useEffect(() => {
    createQRCodeColorGrid("SUCCESS!").then((qrCodeColorGrid) => {
      setQRCodeColorGrid(qrCodeColorGrid);
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <QRCodeEditor qrCodeColorGrid={qrCodeColorGrid} />
      </div>
      <div className="container right">
        <h1>QRコードジェンガ</h1>
        <p className="desc">
          1人〜7人程度までで遊べるパーティーゲーム。
          <br />
          みんなで順番にQRコードを1マスずつ白く塗りつぶして読み取れなくなった人の負け！
        </p>
        <h2>遊び方</h2>
        <p className="usage">
          ① はじめにスマホのQRコードリーダー（例：Google
          レンズ）を準備します。QRコードリーダーでQRコードが読み取れることを確認しましょう。
          <br />
          ②
          QRコードの黒いマスをタップ(クリック)すると白く塗りつぶすことができます。プレイヤーは1マスずつ白く塗りつぶします。
          <br />
          ③
          1マス塗りつぶすごとにQRコードリーダーで読み取れるかを確認します。読み取れれば次のプレイヤーに交代します。
          <br />
          ④
          これをQRコードが読み取れなくなるまで繰り返します。最初に読み取れなくした人の負けです。
          <br />
          <br />
          (やり直したい人のために白マスをタップしても黒マスに反転します)
        </p>
        <div className="create-container">
          <input id="create-input" type="text" defaultValue="SUCCESS!" />{" "}
          <button id="create-button">QRコードを作成</button>
        </div>
        <div className="tweet-container">
          ＼Twitterでシェア！／
          <br />
          <a
            href="http://twitter.com/share?url=https%3A%2F%2Fmakir0n.github.io%2FQRCodeJenga%2F&text=QR%E3%82%B3%E3%83%BC%E3%83%89%E3%82%B8%E3%82%A7%E3%83%B3%E3%82%AC&hashtags=QR%E3%82%B3%E3%83%BC%E3%83%89%E3%82%B8%E3%82%A7%E3%83%B3%E3%82%AC"
            target="_blank"
            className="tweet-button"
          >
            ツイート
          </a>
        </div>
        <div className="credit">
          <a href="privacy.html">プライバシーポリシー</a>
          <br />
          企画、デザイン:
          <a href="https://twitter.com/Makir0n" target="_blank">
            @Makir0n
          </a>{" "}
          開発:
          <a href="https://twitter.com/asakura_dev" target="_blank">
            @asakura_dev
          </a>
          <br />
          QRコードは(株)デンソーウェーブの登録商標です
        </div>
      </div>
    </div>
  );
};
ReactDom.render(<App />, document.getElementById("app"));
