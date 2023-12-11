import React from "react";
import { Svg } from "react-native-svg";

const Game: React.FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  return <Svg width={width} height={height}></Svg>;
};

export default Game;
