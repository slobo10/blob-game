import React, { useContext, useEffect, useRef, useState } from "react";
import { Image } from "react-native-svg";
import { GameContext } from "../screens/Game";
import { GameContextType } from "../constants/types";

const Background: React.FC = () => {
  let [positionOffset, setPositionOffset]: [[number, number], Function] =
    useState(useContext(GameContext).positionOffset);

  let GameContextValue: { current: GameContextType } = useRef(
    useContext(GameContext)
  );
  const constants: {
    current: {
      imageHeight: number;
    };
  } = useRef({
    imageHeight: GameContextValue.current.gameDimensions[1],
  });

  useEffect(() => {
    GameContextValue.current.changePositionOffsetFunctions.push(() => {
      setPositionOffset(GameContextValue.current.positionOffset);
    });
  }, []);

  return (
    <Image
      href={require("./../assets/Images/background3.jpg")}
      height={constants.current.imageHeight}
      x={0 - positionOffset[0]}
      y={0 - positionOffset[1]}
    />
  );
};

export default Background;
