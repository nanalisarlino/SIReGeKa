import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Bawahan = () => {
  return (
    <View>
      <Image
        source={require('../../../assets/gambar/Footer.png')}
        style={styles.wrapper}
      />
      <Text style={styles.Teks}>Komisi Pelayanan Remaja "Gema Kasih"</Text>
      <Text style={styles.Teks2}>GMIM 'BAITEL' KEMA II</Text>
    </View>
  );
};

export default Bawahan;

const styles = StyleSheet.create({
  wrapper: {
    width: 430,
    height: 55,
    top: 385,
    left: -210,
    position: 'absolute',
  },
  Teks: {
    position: 'absolute',
    top: 398,
    left: -100,
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'LeagueSpartan',
  },
  Teks2: {
    position: 'absolute',
    top: 414,
    left: -65,
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'LeagueSpartan',
  },
});
