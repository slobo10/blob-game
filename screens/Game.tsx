import React, {
  Context,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Svg } from "react-native-svg";
import { GameContextType, blobType } from "../constants/types";
import styles from "../constants/styles";
import Blob from "../components/Blob";
import { randomColor } from "../lib/mathLib";

let GameContext: Context<GameContextType | undefined> =
  createContext(undefined);

const Game: React.FC = () => {
  let [blobs, setBlobs]: [blobType[], Function] = useState([
    {
      position: [175, 250],
      size: 50,
      color: randomColor(),
      id: "playerBlob",
      playerControlled: true,
    },
    {
      position: [325, 250],
      size: 60,
      color: randomColor(),
      id: "unmannedBlob0",
    },
    {
      position: [325, 150],
      size: 40,
      color: randomColor(),
      id: "unmannedBlob1",
    },
  ]);

  let GameContextValue: { current: GameContextType } = useRef({
    gameSvgDimensions: [500, 500],
    blobs: [...blobs],
    changeNumberOfBlobs: () => {
      console.log("Number of blobs changed!");
      setBlobs([...GameContextValue.current.blobs]);
    },
    blobSpeed: 10000,
    keyDownEventHandlers: [],
    keyUpEventHandlers: [],
    frameRate: 100,
    updateFunctions: [],
  });

  let blobOutput: React.JSX.Element[] = [];
  let i: number;

  //TODO: Do the key event and such
  useEffect(() => {
    document.addEventListener("keydown", ({ key }: { key: string }) => {
      let i: number;

      for (
        i = 0;
        i < GameContextValue.current.keyDownEventHandlers.length;
        i++
      ) {
        GameContextValue.current.keyDownEventHandlers[i](key);
      }
    });

    document.addEventListener("keyup", ({ key }: { key: string }) => {
      let i: number;

      for (i = 0; i < GameContextValue.current.keyUpEventHandlers.length; i++) {
        GameContextValue.current.keyUpEventHandlers[i](key);
      }
    });

    GameContextValue.current.updateFunctions.push(() => {
      let i: number;
      let j: number;
      let FirstBlobIsBigger: boolean;

      for (i = 0; i < GameContextValue.current.blobs.length; i++) {
        for (j = i; j < GameContextValue.current.blobs.length; j++) {
          FirstBlobIsBigger =
            GameContextValue.current.blobs[i].size >
            GameContextValue.current.blobs[j].size;

          if (i === j) {
            continue;
          }

          if (
            Math.sqrt(
              (GameContextValue.current.blobs[i].position[0] -
                GameContextValue.current.blobs[j].position[0]) **
                2 +
                (GameContextValue.current.blobs[i].position[1] -
                  GameContextValue.current.blobs[j].position[1]) **
                  2
            ) <=
            (FirstBlobIsBigger
              ? GameContextValue.current.blobs[i].size -
                GameContextValue.current.blobs[j].size
              : GameContextValue.current.blobs[j].size -
                GameContextValue.current.blobs[i].size)
          ) {
            if (FirstBlobIsBigger) {
              GameContextValue.current.blobs[i].size = Math.sqrt(
                GameContextValue.current.blobs[i].size ** 2 +
                  GameContextValue.current.blobs[j].size ** 2
              );
              GameContextValue.current.blobs.splice(j, 1);
              j--;
            } else {
              GameContextValue.current.blobs[j].size = Math.sqrt(
                GameContextValue.current.blobs[j].size ** 2 +
                  GameContextValue.current.blobs[i].size ** 2
              );
              GameContextValue.current.blobs.splice(i, 1);
              i--;
            }
            GameContextValue.current.changeNumberOfBlobs();
          }
        }
      }
    });

    setInterval(() => {
      let i: number;

      for (i = 0; i < GameContextValue.current.updateFunctions.length; i++) {
        GameContextValue.current.updateFunctions[i]();
      }
    }, 1000 / GameContextValue.current.frameRate);
  }, []);

  GameContextValue.current.blobs.sort((a, b) => a.size - b.size);

  for (i = 0; i < GameContextValue.current.blobs.length; i++) {
    blobOutput.push(<Blob key={GameContextValue.current.blobs[i].id} id={i} />);
  }

  console.log("Game rendered!");

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
