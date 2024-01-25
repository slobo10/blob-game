import React from "react";
import { Pressable, Text } from "react-native";

const MainMenu: React.FC<{ setScreen: Function }> = ({ setScreen }) => {
  return (
    <>
      <Text>This is the main menu!</Text>
      <Pressable
        onPress={() => {
          setScreen(1);
        }}
      >
        <Text>Start</Text>
      </Pressable>
    </>
  );
};

export default MainMenu;
