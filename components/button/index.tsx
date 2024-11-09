import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  DimensionValue,
} from 'react-native';

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
  width?: string;
}

export function Button(props: IButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        { backgroundColor: props.color, width: props.width as DimensionValue },
        styles.button,
      ]}
    >
      <Text style={styles.button_text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  button_text: {
    color: 'white',
  },
});
