import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Judul = ({label}) => {
  return (
    <View>
      <Text style={styles.judul}>{label}</Text>
    </View>
  );
};

export default Judul;

const styles = StyleSheet.create({
  judul: {
    fontFamily: 'SedanSC-Regular',
    fontSize: 35,
    color: '#fff',
    marginBottom: 40,
  },
});
