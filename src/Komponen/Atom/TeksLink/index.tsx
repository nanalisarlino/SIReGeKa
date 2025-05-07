import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const TeksLink = ({label, onPress, top = 10, left = -160}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, {top}, {left}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TeksLink;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#757575',
    textDecorationLine: 'underline', // Biar kayak link
    position: 'absolute',
    top: 10,
    left: -160,
    fontFamily: 'league-spartan-regular',
  },
});
