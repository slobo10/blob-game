type blobType = {
  position: [number, number];
  size: number;
  color: [number, number, number];
  playerControlled?: boolean;
};

type GameContextType = {
  gameSvgDimensions: [number, number];
  blobs: blobType[];
  blobSpeed: number;
  keyDownEventHandlers: ((key: string) => void)[];
  keyUpEventHandlers: ((key: string) => void)[];
  frameRate: number;
  updateFunctions: (() => void)[];
};

export { GameContextType, blobType };
