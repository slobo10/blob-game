import React from "react";
import { Text } from "react-native";
import Button from "./Button";

const PauseMenu: React.FC<{
  setScreen: Function;
  onResume: () => void;
  onRestart: () => void;
}> = ({ setScreen, onResume, onRestart }) => {
  return (
    <>
      <Text>Paused</Text>
      <Button onPress={onResume}>Resume</Button>
      <Button onPress={onRestart}>Restart</Button>
      <Button
        onPress={() => {
          setScreen(0);
        }}
      >
        Exit to main menu
      </Button>
    </>
  );
};

export default PauseMenu;
