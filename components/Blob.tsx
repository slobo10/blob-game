import React, { useContext, useRef } from "react";
import { Circle } from "react-native-svg";
import { GameContextType } from "../constants/types";
import { GameContext } from "../screens/Game";

const Blob: React.FC<{ id: number }> = ({ id }) => {
  let Context: { current: GameContextType } = useRef(useContext(GameContext));

  let fillColor: string = "#";
  let i: number;

  for (i = 0; i < Context.current.blobs[id].color.length; i++) {
    let colorCharacterNumber: number = Math.floor(
      Context.current.blobs[id].color[i] / 16
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
      Context.current.blobs[id].color[i] - colorCharacterNumber * 16;

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

  return (
    <Circle
      cx={Context.current.blobs[id].position[0]}
      cy={Context.current.blobs[id].position[1]}
      r={Context.current.blobs[id].size}
      fill={fillColor}
    />
  );
};

export default Blob;
