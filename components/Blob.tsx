import React, { useContext, useEffect, useRef, useState } from "react";
import { Circle } from "react-native-svg";
import { GameContextType, blobType } from "../constants/types";
import { GameContext } from "../screens/Game";
import { RGBtoString } from "../lib/mathLib";

const Blob: React.FC<{ id: number }> = ({ id }) => {
  let [thisBlob, setThisBlob]: [blobType, Function] = useState({
    ...useContext(GameContext).blobs[id],
  });
  let [positionOffset, setPositionOffset]: [[number, number], Function] =
    useState([...useContext(GameContext).positionOffset]);

  let GameContextValue: { current: GameContextType } = useRef(
    useContext(GameContext)
  );
  let xSpeed: { current: number } = useRef(0);
  let ySpeed: { current: number } = useRef(0);

  useEffect(() => {
    if (thisBlob.playerControlled) {
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
    }

    GameContextValue.current.changePositionOffsetFunctions.push(() => {
      setPositionOffset([...GameContextValue.current.positionOffset]);
    });

    GameContextValue.current.updateFunctions.push(() => {
      if (xSpeed.current != 0 || ySpeed.current != 0) {
        setThisBlob((oldBlob: blobType) => {
          return {
            ...oldBlob,
            position: [
              oldBlob.position[0] +
                (xSpeed.current * GameContextValue.current.blobSpeed) /
                  Math.sqrt(xSpeed.current ** 2 + ySpeed.current ** 2) /
                  thisBlob.size /
                  GameContextValue.current.frameRate,
              oldBlob.position[1] +
                (ySpeed.current * GameContextValue.current.blobSpeed) /
                  Math.sqrt(xSpeed.current ** 2 + ySpeed.current ** 2) /
                  thisBlob.size /
                  GameContextValue.current.frameRate,
            ],
          };
        });
      }
    });
  }, []);
  useEffect(() => {
    GameContextValue.current.blobs[id] = thisBlob;
  }, [thisBlob]);
  if (thisBlob.playerControlled) {
    useEffect(() => {
      GameContextValue.current.positionOffset = [
        thisBlob.position[0] -
          GameContextValue.current.gameSvgDimensions[0] / 2,
        thisBlob.position[1] -
          GameContextValue.current.gameSvgDimensions[1] / 2,
      ];

      GameContextValue.current.changePositionOffset(); //TODO: Prevent player-controlled blob from needlessly rerendering
    }, [thisBlob.position]);
  }

  const fillColor: string = RGBtoString(thisBlob.color);

  console.log(
    thisBlob.id[0].toUpperCase() +
      thisBlob.id.slice(1, thisBlob.id.length) +
      " rendered!"
  );

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
