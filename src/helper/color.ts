import type { COLOR } from "@/types";

export const oppositeColor = (color: COLOR): COLOR => {
  return color === "white" ? "black" : "white";
};
