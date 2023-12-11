import React, { Context, createContext, useRef } from "react";
import { Svg } from "react-native-svg";
import { GameContextType } from "../constants/types";

let GameContext: Context<GameContextType | undefined> =
  createContext(undefined);

const Game: React.FC = () => {
  let GameContextValue: { current: GameContextType } = useRef({
    gameSvgDimensions: [500, 500],
    blobs: [
      {
        position: [250, 250],
        size: 50,
        color: [0, 255, 0],
      },
    ],
  });

  return (
    <GameContext.Provider value={GameContextValue.current}>
      <Svg
        width={GameContextValue.current.gameSvgDimensions[0]}
        height={GameContextValue.current.gameSvgDimensions[1]}
      ></Svg>
    </GameContext.Provider>
  );
};

export default Game;
