import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const TeksBiasa = ({label, top = 0, left = -160}) => {
  return (
    <View>
      <Text style={[styles.TeksBiasa, {top}, {left}]}>{label}</Text>
    </View>
  );
};

export default TeksBiasa;

const styles = StyleSheet.create({
  TeksBiasa: {
    position: 'absolute',
    top: 10,
    left: -160,
    fontSize: 18,
    color: '#000000',
    fontFamily: 'league-spartan-regular',
  },
});
