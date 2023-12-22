import React, { useContext, useEffect, useRef, useState } from "react";
import { Circle } from "react-native-svg";
import { GameContextType, blobType } from "../constants/types";
import { GameContext } from "../screens/Game";

const Blob: React.FC<{ id: number }> = ({ id }) => {
  let [thisBlob, setThisBlob]: [blobType, Function] = useState({
    ...useContext(GameContext).blobs[id],
  });

  let GameContextValue: { current: GameContextType } = useRef(
    useContext(GameContext)
  );
  let xSpeed: { current: number } = useRef(0);
  let ySpeed: { current: number } = useRef(0);

  let fillColor: string = "#";
  let i: number;

  useEffect(() => {
    if (thisBlob.playerControlled) {
      GameContextValue.current.keyDownEventHandlers.push((key: string) => {
        switch (key.toUpperCase()) {
          case "W": {
            ySpeed.current =
              -GameContextValue.current.blobSpeed / thisBlob.size;
            break;
          }
          case "A": {
            xSpeed.current =
              -GameContextValue.current.blobSpeed / thisBlob.size;
            break;
          }
          case "S": {
            ySpeed.current = GameContextValue.current.blobSpeed / thisBlob.size;
            break;
          }
          case "D": {
            xSpeed.current = GameContextValue.current.blobSpeed / thisBlob.size;
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

    GameContextValue.current.updateFunctions.push(() => {
      thisBlob.position[0] +=
        xSpeed.current / GameContextValue.current.frameRate;
      thisBlob.position[1] +=
        ySpeed.current / GameContextValue.current.frameRate;

      if (xSpeed.current != 0 || ySpeed.current != 0) {
        setThisBlob((oldBlob: blobType) => ({
          ...oldBlob,
          position: [thisBlob.position[0], thisBlob.position[1]],
        }));
      }
    });
  }, []);
  useEffect(() => {
    GameContextValue.current.blobs[id] = thisBlob;
  }, [thisBlob]);

  for (i = 0; i < GameContextValue.current.blobs[id].color.length; i++) {
    let colorCharacterNumber: number = Math.floor(
      GameContextValue.current.blobs[id].color[i] / 16
    );

    switch (colorCharacterNumber) {
      case 10: {
        fillColor += "a";
        break;
      }
      case 11: {
        fillColor += "b";
        break;
      }
      case 12: {
        fillColor += "c";
        break;
      }
      case 13: {
        fillColor += "d";
        break;
      }
      case 14: {
        fillColor += "e";
        break;
      }
      case 15: {
        fillColor += "f";
        break;
      }
      default: {
        fillColor += colorCharacterNumber.toString();
      }
    }

    colorCharacterNumber =
      GameContextValue.current.blobs[id].color[i] - colorCharacterNumber * 16;

    switch (colorCharacterNumber) {
      case 10: {
        fillColor += "a";
        break;
      }
      case 11: {
        fillColor += "b";
        break;
      }
      case 12: {
        fillColor += "c";
        break;
      }
      case 13: {
        fillColor += "d";
        break;
      }
      case 14: {
        fillColor += "e";
        break;
      }
      case 15: {
        fillColor += "f";
        break;
      }
      default: {
        fillColor += colorCharacterNumber.toString();
      }
    }
  }

  console.log("Blob " + id + " rendered!");

  return (
    <Circle
      cx={thisBlob.position[0]}
      cy={thisBlob.position[1]}
      r={thisBlob.size}
      fill={fillColor}
    />
  );
};

export default Blob;
