import React, { useContext, useRef } from "react";
import { Circle } from "react-native-svg";
import { GameContextType } from "../constants/types";
import { GameContext } from "../screens/Game";

const Blob: React.FC<{ id: number }> = ({ id }) => {
  let Context: { current: GameContextType } = useRef(useContext(GameContext));
  return (
    <Circle
      cx={Context.current.blobs[id].position[0]}
      cy={Context.current.blobs[id].position[1]}
      r={Context.current.blobs[id].size}
      fill={"blue"} //TODO: Get rid of this hardcode
    />
  );
};

export default Blob;
