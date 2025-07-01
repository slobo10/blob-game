import React, {
  Context,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Rect, Svg, Text } from "react-native-svg";
import { GameContextType, blobType } from "../constants/types";
import styles from "../constants/styles";
import Blob from "../components/Blob";
import Button from "../components/Button";
import PauseMenu from "../components/PauseMenu";
import GameData from "../lib/gameData";
import Background from "../components/Background";
import { Dimensions, NativeTouchEvent, Pressable } from "react-native";

let GameContext: Context<GameContextType | undefined> =
  createContext(undefined);

const Game: React.FC<{ setScreen: Function }> = ({ setScreen }) => {
  let [blobs, setBlobs]: [blobType[], Function] = useState([]);
  let [playerBlob, setPlayerBlob]: [blobType, Function] = useState();
  let [paused, setPauseState] = useState(0);
  let [playerAlive, setPlayerState]: [boolean, Function] = useState(true);
  let [gameSvgDimensions, setGameSvgDimensions]: [[number, number], Function] =
    useState([Dimensions.get("window").width, Dimensions.get("window").height]);

  let gameData: { current: GameData | undefined } = useRef();

  let blobOutputA: React.JSX.Element[] = [];
  let blobOutputB: React.JSX.Element[] = [];
  let i: number;

  useEffect(() => {
    Dimensions.addEventListener("change", () => {
      setGameSvgDimensions([
        Dimensions.get("window").width,
        Dimensions.get("window").height,
      ]);
      gameData.current.gameContextValue.gameSvgDimensions = [
        Dimensions.get("window").width,
        Dimensions.get("window").height,
      ];
    });
    gameData.current = new GameData(
      0,
      setBlobs,
      setPlayerBlob,
      setPlayerState,
      setPauseState
    );
  }, []);

  if (gameData.current) {
    for (i = 0; i < blobs.length && blobs[i].size < playerBlob.size; i++) {
      blobOutputA.push(<Blob key={blobs[i].id} id={i} />);
    }
    for (; i < blobs.length; i++) {
      blobOutputB.push(<Blob key={blobs[i].id} id={i} />);
    }

    return (
      <GameContext.Provider value={gameData.current.gameContextValue}>
        {!paused ? (
          <>
            <Pressable
              onPressIn={(e) => {
                console.log("touched!");
                console.log(e);
                // console.log(e.nativeEvent.locationX, e.nativeEvent.locationY);
                setTimeout(() => {
                  // console.log(e.nativeEvent.locationX, e.nativeEvent.locationY);
                  console.log(e);
                }, 500);
                for (
                  let i = 0;
                  i <
                  gameData.current.gameContextValue.pressEventHandlers.length;
                  i++
                ) {
                  gameData.current.gameContextValue.pressEventHandlers[i](e);
                }
              }}
            >
              <Svg
                style={styles.gameSvg}
                width={gameSvgDimensions[0]}
                height={gameSvgDimensions[1]}
              >
                <Background />
                {blobOutputA}
                {playerAlive && <Blob id="player" />}
                {blobOutputB}
                <Text x={25} y={25}>
                  Blob count:{" "}
                  {gameData.current.gameContextValue.blobs.length +
                    (playerAlive ? 1 : 0)}
                </Text>
                <Rect
                  x={gameSvgDimensions[0] - 50}
                  y={0}
                  width={50}
                  height={50}
                  onPress={() => {
                    gameData.current.setPlayingState(false);
                  }}
                />
              </Svg>
              {/* <Button
              onPress={() => {
                gameData.current.setPlayingState(false);
              }}
            >
              Pause
            </Button>{" "} */}
            </Pressable>
          </>
        ) : (
          <PauseMenu
            setScreen={setScreen}
            onResume={() => {
              gameData.current.setPlayingState(true);
            }}
            onRestart={() => {
              gameData.current = new GameData(
                gameData.current.blobCount,
                setBlobs,
                setPlayerBlob,
                setPlayerState,
                setPauseState
              );
            }}
          />
        )}
      </GameContext.Provider>
    );
  }
};

export default Game;

export { GameContext };
