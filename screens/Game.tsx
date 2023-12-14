import React, { Context, createContext, useRef } from "react";
import { Svg } from "react-native-svg";
import { GameContextType } from "../constants/types";
import styles from "../constants/styles";
import Blob from "../components/Blob";

let GameContext: Context<GameContextType | undefined> =
  createContext(undefined);

const Game: React.FC = () => {
  let GameContextValue: { current: GameContextType } = useRef({
    gameSvgDimensions: [500, 500],
    blobs: [
      {
        position: [250, 250],
        size: 50,
        color: [
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
        ],
      },
    ],
  });

  let blobOutput: React.JSX.Element[] = [];
  let i: number;

  for (i = 0; i < GameContextValue.current.blobs.length; i++) {
    blobOutput.push(<Blob id={i} />);
  }

  return (
    <GameContext.Provider value={GameContextValue.current}>
      <Svg
        style={styles.gameSvg}
        width={GameContextValue.current.gameSvgDimensions[0]}
        height={GameContextValue.current.gameSvgDimensions[1]}
      >
        {blobOutput}
      </Svg>
    </GameContext.Provider>
  );
};

export default Game;

export { GameContext };
