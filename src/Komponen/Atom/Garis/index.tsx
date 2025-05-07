import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const Garis = ({top = 30, left = 30, width = 65, height = 3}) => {
  return <View style={[styles.garis, {top}, {left}, {width}, {height}]} />;
};

export default Garis;

const styles = StyleSheet.create({
  garis: {
    height: 3,
    backgroundColor: '#757575',
    width: 65,
    top: 30,
    left: 30,
  },
});
