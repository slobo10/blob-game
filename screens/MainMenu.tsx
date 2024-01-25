import React from "react";
import { Text } from "react-native";
import Button from "../components/Button";

const MainMenu: React.FC<{ setScreen: Function }> = ({ setScreen }) => {
  return (
    <>
      <Text>This is the main menu!</Text>
      <Button
        onPress={() => {
          setScreen(1);
        }}
      >
        Start
      </Button>
    </>
  );
};

export default MainMenu;
