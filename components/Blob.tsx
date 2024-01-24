import React, { useContext, useEffect, useRef, useState } from "react";
import { Circle } from "react-native-svg";
import { GameContextType, blobType } from "../constants/types";
import { GameContext } from "../screens/Game";
import { RGBtoString } from "../lib/mathLib";

const Blob: React.FC<{ id: number | "player" }> = ({ id }) => {
  let [thisBlob, setThisBlob]: [blobType, Function] = useState({
    ...(id === "player"
      ? useContext(GameContext).playerBlob
      : useContext(GameContext).blobs[id]),
  });
  let [positionOffset, setPositionOffset]: [[number, number], Function] =
    useState([...useContext(GameContext).positionOffset]);

  let GameContextValue: { current: GameContextType } = useRef(
    useContext(GameContext)
  );
  let xSpeed: { current: number } = useRef(0);
  let ySpeed: { current: number } = useRef(0);

  useEffect(() => {
    if (id === "player") {
      GameContextValue.current.keyDownEventHandlers.push((key: string) => {
        switch (key.toUpperCase()) {
          case "W": {
            ySpeed.current = -1;
            break;
          }
          case "A": {
            xSpeed.current = -1;
            break;
          }
          case "S": {
            ySpeed.current = 1;
            break;
          }
          case "D": {
            xSpeed.current = 1;
            break;
          }
        }
      });

      GameContextValue.current.keyUpEventHandlers.push((key: string) => {
        if (key.toUpperCase() === "W" || key.toUpperCase() === "S") {
          ySpeed.current = 0;
        }
        if (key.toUpperCase() === "A" || key.toUpperCase() === "D") {
          xSpeed.current = 0;
        }
      });
    } else {
      GameContextValue.current.updateFunctions.push(() => {
        xSpeed.current += Math.random() * 2 - 1;
        ySpeed.current += Math.random() * 2 - 1;
      });
    }

    GameContextValue.current.changePositionOffsetFunctions.push(() => {
      setPositionOffset([...GameContextValue.current.positionOffset]);
    });

    GameContextValue.current.updateFunctions.push(() => {
      if (xSpeed.current != 0 || ySpeed.current != 0) {
        setThisBlob((oldBlob: blobType) => {
          let newPosition: [number, number] = [
            oldBlob.position[0] +
              (xSpeed.current * GameContextValue.current.blobSpeed) /
                Math.sqrt(xSpeed.current ** 2 + ySpeed.current ** 2) /
                oldBlob.size /
                GameContextValue.current.frameRate,
            oldBlob.position[1] +
              (ySpeed.current * GameContextValue.current.blobSpeed) /
                Math.sqrt(xSpeed.current ** 2 + ySpeed.current ** 2) /
                oldBlob.size /
                GameContextValue.current.frameRate,
          ];

          if (newPosition[0] < oldBlob.size) {
            newPosition[0] = oldBlob.size;
            if (id !== "player") {
              xSpeed.current *= -1;
            }
          } else if (
            newPosition[0] >
            GameContextValue.current.gameDimensions[0] - oldBlob.size
          ) {
            newPosition[0] =
              GameContextValue.current.gameDimensions[0] - oldBlob.size;
            if (id !== "player") {
              xSpeed.current *= -1;
            }
          }

          if (newPosition[1] < oldBlob.size) {
            newPosition[1] = oldBlob.size;
            if (id !== "player") {
              ySpeed.current *= -1;
            }
          } else if (
            newPosition[1] >
            GameContextValue.current.gameDimensions[1] - oldBlob.size
          ) {
            newPosition[1] =
              GameContextValue.current.gameDimensions[1] - oldBlob.size;
            if (id !== "player") {
              ySpeed.current *= -1;
            }
          }
          if (!Number.isNaN(newPosition[0]) && !Number.isNaN(newPosition[1])) {
            return {
              ...oldBlob,
              position: newPosition,
            };
          } else {
            return oldBlob;
          }
        });
      }
    });
  }, []);
  if (id === "player") {
    useEffect(() => {
      GameContextValue.current.playerBlob = thisBlob;
    }, [thisBlob]);
    useEffect(() => {
      GameContextValue.current.positionOffset = [
        thisBlob.position[0] -
          GameContextValue.current.gameSvgDimensions[0] / 2,
        thisBlob.position[1] -
          GameContextValue.current.gameSvgDimensions[1] / 2,
      ];

      if (GameContextValue.current.positionOffset[0] < 0) {
        GameContextValue.current.positionOffset[0] = 0;
      } else if (
        GameContextValue.current.positionOffset[0] >
        GameContextValue.current.gameDimensions[0] -
          GameContextValue.current.gameSvgDimensions[0]
      ) {
        GameContextValue.current.positionOffset[0] =
          GameContextValue.current.gameDimensions[0] -
          GameContextValue.current.gameSvgDimensions[0];
      }

      if (GameContextValue.current.positionOffset[1] < 0) {
        GameContextValue.current.positionOffset[1] = 0;
      } else if (
        GameContextValue.current.positionOffset[1] >
        GameContextValue.current.gameDimensions[1] -
          GameContextValue.current.gameSvgDimensions[1]
      ) {
        GameContextValue.current.positionOffset[1] =
          GameContextValue.current.gameDimensions[1] -
          GameContextValue.current.gameSvgDimensions[1];
      }

      GameContextValue.current.changePositionOffset(); //TODO: Prevent player-controlled blob from needlessly rerendering
    }, [thisBlob.position]);
  } else {
    useEffect(() => {
      GameContextValue.current.blobs[id] = thisBlob;
    }, [thisBlob]);
  }

  const fillColor: string = RGBtoString(thisBlob.color);

  return (
    <Circle
      cx={thisBlob.position[0] - positionOffset[0]}
      cy={thisBlob.position[1] - positionOffset[1]}
      r={thisBlob.size}
      fill={fillColor}
    />
  );
};

export default Blob;
