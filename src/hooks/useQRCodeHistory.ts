import { oppositeColor } from "@/helper/color";
import { COLOR, QRCodeColorCell, QRCodeGrid } from "@/types";
import { useEffect, useState } from "react";

/**
 * コマンド: QRCodeに対する操作の実行単位
 * action.recordCommand でコマンドを渡し、historyの管理とQRCodeGridの更新を行う
 */
type Command = ChangeColorCommand;
type ChangeColorCommand = {
  type: "changeColorCommand";
  x: number;
  y: number;
  color: COLOR;
};

type UseQRCodeHistoryReturn = {
  qrCodeGrid: QRCodeGrid | null; // コマンド実行後のQRCodeGrid
  availableUndo: boolean; // Undo可能か
  availableRedo: boolean; // Redo可能か
  action: {
    /**
     * コマンドをHistoryに追加・実行し、qrCodeGridを更新する
     * Redo可能な状態(1回以上Undoした状態)でコマンドをRecordすると、Redo可能なコマンドは破棄される
     * 例
     * recordCommand実行前(commandA~commandCがhistoryに存在し、indexがcommandBのケース。commandCはUndoされたコマンドで未適用)
     *   [commandA, commandB(index), commandC]
     * recordCommand実行後(commandDをrecord)
     *   [commandA, commandB, commandD(index)]
     */
    recordCommand: (command: Command) => void;
    /**
     * Undoを実行し、qrCodeGridを更新する
     */
    undo: () => void;
    /**
     * Redoを実行し、qrCodeGridを更新する
     */
    redo: () => void;
  };
};

/**
 * History Feature(Undo/Redo)
 * 初期状態のQRCodeGridを引数で渡す
 *   引数が変更された場合、Historyはリセットされる
 * 返り値のactionを実行しHistoryの管理とQRCodeGridの更新を行う
 */
export const useQRCodeHistory = (
  initialQRCodeGrid: QRCodeGrid | null
): UseQRCodeHistoryReturn => {
  const [qrCodeGrid, setQRCodeGrid] = useState<QRCodeGrid | null>(
    initialQRCodeGrid
  );
  const [commandHistory, setCommandHistory] = useState<{
    commands: Command[];
    index: number; // 現在のHistory Index。指し示しているindexのCommandは実行済み。0始まり
  }>({ commands: [], index: -1 });
  useEffect(() => {
    setQRCodeGrid(initialQRCodeGrid);
    setCommandHistory({
      commands: [],
      index: -1,
    });
  }, [initialQRCodeGrid]);

  const availableRedo =
    commandHistory.commands.length - 1 > commandHistory.index;
  const availableUndo = commandHistory.index >= 0;
  const execCommand = (command: Command, direction: "do" | "undo") => {
    if (!qrCodeGrid) {
      return;
    }
    switch (command.type) {
      case "changeColorCommand":
        const nextColor =
          direction === "do" ? command.color : oppositeColor(command.color);
        const newQRCodeGrid = [...qrCodeGrid];
        newQRCodeGrid[command.y][command.x] = {
          ...(newQRCodeGrid[command.y][command.x] as QRCodeColorCell),
          color: nextColor,
        };
        setQRCodeGrid(newQRCodeGrid);
        break;
    }
  };
  const recordCommand = (command: Command) => {
    execCommand(command, "do");
    const newCommands = [
      ...commandHistory.commands.slice(0, commandHistory.index + 1), // 新しいcommandを追加する時、未実行の未来のcommandは削除する
      command,
    ];
    setCommandHistory({
      commands: newCommands,
      index: newCommands.length - 1,
    });
  };
  const undo = () => {
    if (!availableUndo) {
      return;
    }
    const command = commandHistory.commands[commandHistory.index];
    execCommand(command, "undo");
    setCommandHistory({
      ...commandHistory,
      index: commandHistory.index - 1,
    });
  };
  const redo = () => {
    if (!availableRedo) {
      return;
    }
    const index = commandHistory.index + 1;
    const command = commandHistory.commands[index];
    execCommand(command, "do");
    setCommandHistory({
      ...commandHistory,
      index,
    });
  };
  return {
    qrCodeGrid,
    availableUndo,
    availableRedo,
    action: {
      recordCommand,
      undo,
      redo,
    },
  };
};
