import React from "react";
import { Pressable, Text } from "react-native";
import styles from "../constants/styles";

const Button: React.FC<{ children: string; onPress: () => void }> = ({
  children,
  onPress,
}) => {
  return (
    <>
      <Pressable
        style={(status: { hovered: boolean; pressed: boolean }) => {
          return [
            styles.buttonContainerBase,
            status.pressed
              ? styles.buttonContainerClicked
              : status.hovered
              ? styles.buttonContainerHovered
              : styles.buttonContainer,
          ];
        }}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </>
  );
};

export default Button;
