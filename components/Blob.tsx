import React, { useContext, useRef } from "react";
import { Circle } from "react-native-svg";
import { GameContextType } from "../constants/types";
import { GameContext } from "../screens/Game";

const Blob: React.FC<{ id: number }> = ({ id }) => {
  let GameContextValue: { current: GameContextType } = useRef(
    useContext(GameContext)
  );

  let fillColor: string = "#";
  let i: number;

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
      cx={GameContextValue.current.blobs[id].position[0]}
      cy={GameContextValue.current.blobs[id].position[1]}
      r={GameContextValue.current.blobs[id].size}
      fill={fillColor}
    />
  );
};

export default Blob;
