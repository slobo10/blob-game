type GameContextType = {
  gameSvgDimensions: [number, number];
  blobs: {
    position: [number, number];
    size: number;
    color: [number, number, number];
  }[];
};

export { GameContextType };
