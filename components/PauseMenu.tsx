import React from "react";
import { Text, View } from "react-native";
import Button from "./Button";
import styles from "../constants/styles";

const PauseMenu: React.FC<{
  setScreen: Function;
  onResume: () => void;
  onRestart: () => void;
}> = ({ setScreen, onResume, onRestart }) => {
  return (
    <>
      <View style={styles.menuContainer}>
        <Text style={styles.mainText}>Paused</Text>
        <Button onPress={onResume}>Resume</Button>
        <Button onPress={onRestart}>Restart</Button>
        <Button
          onPress={() => {
            setScreen(0);
          }}
        >
          Exit to main menu
        </Button>
      </View>
    </>
  );
};

export default PauseMenu;
