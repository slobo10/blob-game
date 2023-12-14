type blobType = {
  position: [number, number];
  size: number;
  color: [number, number, number];
};

type GameContextType = {
  gameSvgDimensions: [number, number];
  blobs: blobType[];
};

export { GameContextType };
