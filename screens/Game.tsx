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
import Button from "../components/Button";
import PauseMenu from "../components/PauseMenu";
import GameData from "../lib/gameData";

let GameContext: Context<GameContextType | undefined> =
  createContext(undefined);

const Game: React.FC<{ setScreen: Function }> = ({ setScreen }) => {
  let [blobs, setBlobs]: [blobType[], Function] = useState([]);
  let [playerBlob, setPlayerBlob]: [blobType, Function] = useState();
  let [paused, setPauseState] = useState(0);
  let [playerAlive, setPlayerState]: [boolean, Function] = useState(true);

  let gameData: { current: GameData | undefined } = useRef();

  let blobOutputA: React.JSX.Element[] = [];
  let blobOutputB: React.JSX.Element[] = [];
  let i: number;

  useEffect(() => {
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
            <Svg
              style={styles.gameSvg}
              width={gameData.current.gameContextValue.gameSvgDimensions[0]}
              height={gameData.current.gameContextValue.gameSvgDimensions[1]}
            >
              {blobOutputA}
              {playerAlive && <Blob id="player" />}
              {blobOutputB}
            </Svg>
            <Button
              onPress={() => {
                gameData.current.setPlayingState(false);
              }}
            >
              Pause
            </Button>{" "}
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
