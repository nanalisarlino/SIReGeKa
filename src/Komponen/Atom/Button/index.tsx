import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  width: number;
};

const Button: React.FC<ButtonProps> = ({title, onPress, width = 300}) => {
  return (
    <TouchableOpacity style={[styles.button, {width}]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D3250',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
});
