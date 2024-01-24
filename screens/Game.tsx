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
import { average, randomColor } from "../lib/mathLib";

let GameContext: Context<GameContextType | undefined> =
  createContext(undefined);

const Game: React.FC = () => {
  let [blobs, setBlobs]: [blobType[], Function] = useState([
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
  let [playerBlob, setPlayerBlob]: [blobType, Function] = useState({
    position: [500, 250],
    size: 50,
    color: randomColor(),
    id: "playerBlob",
  });
  let [playerAlive, setPlayerState]: [boolean, Function] = useState(true);

  let GameContextValue: { current: GameContextType } = useRef({
    gameSvgDimensions: [500, 500],
    gameDimensions: [3200, 3200],
    positionOffset: [0, 0],
    changePositionOffset: () => {
      let i: number;

      for (
        i = 0;
        i < GameContextValue.current.changePositionOffsetFunctions.length;
        i++
      ) {
        GameContextValue.current.changePositionOffsetFunctions[i]();
      }
    },
    changePositionOffsetFunctions: [],
    blobs: [...blobs],
    playerBlob: { ...playerBlob },
    changeNumberOfBlobs: () => {
      setBlobs([...GameContextValue.current.blobs]);
      setPlayerBlob({ ...GameContextValue.current.playerBlob });
    },
    blobSpeed: 10000,
    keyDownEventHandlers: [],
    keyUpEventHandlers: [],
    frameRate: 100,
    updateFunctions: [],
  });

  let blobOutput: React.JSX.Element[] = [];
  let i: number;

  useEffect(() => {
    GameContextValue.current.positionOffset = [
      GameContextValue.current.playerBlob.position[0] -
        GameContextValue.current.gameSvgDimensions[0] / 2,
      GameContextValue.current.playerBlob.position[1] -
        GameContextValue.current.gameSvgDimensions[1] / 2,
    ];

    GameContextValue.current.changePositionOffset(); //TODO: Prevent blobs from double rendering when game initializes

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
      let k: number;
      let FirstBlobIsBigger: boolean;

      for (i = 0; i < GameContextValue.current.blobs.length; i++) {
        if (playerAlive) {
          FirstBlobIsBigger =
            GameContextValue.current.blobs[i].size >
            GameContextValue.current.playerBlob.size;

          if (
            Math.sqrt(
              (GameContextValue.current.blobs[i].position[0] -
                GameContextValue.current.playerBlob.position[0]) **
                2 +
                (GameContextValue.current.blobs[i].position[1] -
                  GameContextValue.current.playerBlob.position[1]) **
                  2
            ) <=
            (FirstBlobIsBigger
              ? GameContextValue.current.blobs[i].size -
                GameContextValue.current.playerBlob.size
              : GameContextValue.current.playerBlob.size -
                GameContextValue.current.blobs[i].size)
          ) {
            if (FirstBlobIsBigger) {
              GameContextValue.current.blobs[i].size = Math.sqrt(
                GameContextValue.current.blobs[i].size ** 2 +
                  GameContextValue.current.playerBlob.size ** 2
              );

              for (k = 0; k < 3; k++) {
                GameContextValue.current.blobs[i].color[k] = Math.round(
                  average(
                    GameContextValue.current.blobs[i].color[k],
                    GameContextValue.current.playerBlob.color[k],
                    GameContextValue.current.blobs[i].size,
                    GameContextValue.current.blobs[i].size
                  )
                );
              }
              playerAlive = false; //TODO: Fix this
              setPlayerState(false); //You Died
              j--;
            } else {
              GameContextValue.current.playerBlob.size = Math.sqrt(
                GameContextValue.current.playerBlob.size ** 2 +
                  GameContextValue.current.blobs[i].size ** 2
              );

              for (k = 0; k < 3; k++) {
                GameContextValue.current.playerBlob.color[k] = Math.round(
                  average(
                    GameContextValue.current.blobs[i].color[k],
                    GameContextValue.current.playerBlob.color[k],
                    GameContextValue.current.blobs[i].size,
                    GameContextValue.current.blobs[i].size
                  )
                );
              }
              GameContextValue.current.blobs.splice(i, 1);
              i--;
            }
            GameContextValue.current.changeNumberOfBlobs();
          }
        }

        for (j = i; j < GameContextValue.current.blobs.length; j++) {
          if (i === j) {
            continue;
          }

          FirstBlobIsBigger =
            GameContextValue.current.blobs[i].size >
            GameContextValue.current.blobs[j].size;

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

              for (k = 0; k < 3; k++) {
                GameContextValue.current.blobs[i].color[k] = Math.round(
                  average(
                    GameContextValue.current.blobs[i].color[k],
                    GameContextValue.current.blobs[j].color[k],
                    GameContextValue.current.blobs[i].size,
                    GameContextValue.current.blobs[i].size
                  )
                );
              }
              GameContextValue.current.blobs.splice(j, 1);
              j--;
            } else {
              GameContextValue.current.blobs[j].size = Math.sqrt(
                GameContextValue.current.blobs[j].size ** 2 +
                  GameContextValue.current.blobs[i].size ** 2
              );

              for (k = 0; k < 3; k++) {
                GameContextValue.current.blobs[j].color[k] = Math.round(
                  average(
                    GameContextValue.current.blobs[i].color[k],
                    GameContextValue.current.blobs[j].color[k],
                    GameContextValue.current.blobs[i].size,
                    GameContextValue.current.blobs[i].size
                  )
                );
              }
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

  return (
    <GameContext.Provider value={GameContextValue.current}>
      <Svg
        style={styles.gameSvg}
        width={GameContextValue.current.gameSvgDimensions[0]}
        height={GameContextValue.current.gameSvgDimensions[1]}
      >
        {playerAlive && <Blob id="player" />}
        {blobOutput}
      </Svg>
    </GameContext.Provider>
  );
};

export default Game;

export { GameContext };
