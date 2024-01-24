type blobType = {
  position: [number, number];
  size: number;
  color: [number, number, number];
  id: string;
};

type GameContextType = {
  gameSvgDimensions: [number, number];
  gameDimensions: [number, number];
  positionOffset: [number, number];
  changePositionOffset: Function;
  changePositionOffsetFunctions: (() => void)[];
  blobs: blobType[];
  playerBlob: blobType;
  changeNumberOfBlobs: Function;
  blobSpeed: number;
  keyDownEventHandlers: ((key: string) => void)[];
  keyUpEventHandlers: ((key: string) => void)[];
  frameRate: number;
  updateFunctions: (() => void)[];
};

export { GameContextType, blobType };
