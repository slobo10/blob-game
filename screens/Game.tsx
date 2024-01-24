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
import { average, blobsAreTouching, randomColor } from "../lib/mathLib";

let GameContext: Context<GameContextType | undefined> =
  createContext(undefined);

const Game: React.FC = () => {
  let [blobs, setBlobs]: [blobType[], Function] = useState([]);
  let [playerBlob, setPlayerBlob]: [blobType, Function] = useState({
    position: [1600, 1600],
    size: 50,
    color: randomColor(),
    id: "playerBlob",
  });
  let [playerAlive, setPlayerState]: [boolean, Function] = useState(true);

  let GameContextValue: { current: GameContextType } = useRef({
    gameSvgDimensions: [1250, 750],
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
    blobCount: 0,
    changeNumberOfBlobs: () => {
      setBlobs([...GameContextValue.current.blobs]);
      setPlayerBlob({ ...GameContextValue.current.playerBlob });
    },
    blobSpeed: 20000,
    keyDownEventHandlers: [],
    keyUpEventHandlers: [],
    frameRate: 100,
    updateFunctions: [],
  });

  let blobOutputA: React.JSX.Element[] = [];
  let blobOutputB: React.JSX.Element[] = [];
  let i: number;

  useEffect(() => {
    let i: number = 0;

    for (i = 0; i < 250; i++) {
      GameContextValue.current.blobs.push({
        position: [
          Math.random() * GameContextValue.current.gameDimensions[0],
          Math.random() * GameContextValue.current.gameDimensions[1],
        ],
        size: Math.random() * 50,
        color: randomColor(),
        id: "unmannedBlob" + GameContextValue.current.blobCount,
      });
      GameContextValue.current.blobCount++;
    }

    GameContextValue.current.positionOffset = [
      GameContextValue.current.playerBlob.position[0] -
        GameContextValue.current.gameSvgDimensions[0] / 2,
      GameContextValue.current.playerBlob.position[1] -
        GameContextValue.current.gameSvgDimensions[1] / 2,
    ];

    GameContextValue.current.changeNumberOfBlobs();
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

      for (i = 0; i < GameContextValue.current.blobs.length; i++) {
        if (playerAlive) {
          blobsAreTouching(
            GameContextValue.current.playerBlob,
            GameContextValue.current.blobs[i],
            () => {
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
                    GameContextValue.current.playerBlob.color[k]
                  )
                );
              }

              playerAlive = false; //TODO: Fix this
              GameContextValue.current.changeNumberOfBlobs();
              setPlayerState(false); //You Died
            },
            () => {
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

              GameContextValue.current.changeNumberOfBlobs();
            }
          );
        }

        for (j = i; j < GameContextValue.current.blobs.length; j++) {
          if (i === j) {
            continue;
          }

          blobsAreTouching(
            GameContextValue.current.blobs[i],
            GameContextValue.current.blobs[j],
            () => {
              GameContextValue.current.blobs[j].size = Math.sqrt(
                GameContextValue.current.blobs[i].size ** 2 +
                  GameContextValue.current.blobs[j].size ** 2
              );

              for (k = 0; k < 3; k++) {
                GameContextValue.current.blobs[j].color[k] = Math.round(
                  average(
                    GameContextValue.current.blobs[i].color[k],
                    GameContextValue.current.blobs[j].color[k],
                    GameContextValue.current.blobs[i].size,
                    GameContextValue.current.blobs[j].size
                  )
                );
              }
              GameContextValue.current.blobs.splice(i, 1);
              GameContextValue.current.changeNumberOfBlobs();
              j--;
            },
            () => {
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
                    GameContextValue.current.blobs[j].size
                  )
                );
              }
              GameContextValue.current.blobs.splice(j, 1);
              GameContextValue.current.changeNumberOfBlobs();
              j--;
            }
          );
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

  for (
    i = 0;
    i < GameContextValue.current.blobs.length &&
    GameContextValue.current.blobs[i].size <
      GameContextValue.current.playerBlob.size;
    i++
  ) {
    blobOutputA.push(
      <Blob key={GameContextValue.current.blobs[i].id} id={i} />
    );
  }
  for (; i < GameContextValue.current.blobs.length; i++) {
    blobOutputB.push(
      <Blob key={GameContextValue.current.blobs[i].id} id={i} />
    );
  }

  return (
    <GameContext.Provider value={GameContextValue.current}>
      <Svg
        style={styles.gameSvg}
        width={GameContextValue.current.gameSvgDimensions[0]}
        height={GameContextValue.current.gameSvgDimensions[1]}
      >
        {blobOutputA}
        {playerAlive && <Blob id="player" />}
        {blobOutputB}
      </Svg>
    </GameContext.Provider>
  );
};

export default Game;

export { GameContext };
