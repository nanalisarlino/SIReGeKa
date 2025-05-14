import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

interface AtasanProps {
  label: string;
  subtitle?: string;
  top?: number;
  left?: number;
  fontSize?: number;
  width?: number;
  height?: number;
}

const Atasan: React.FC<AtasanProps> = ({
  label,
  subtitle,
  top = -400,
  left = -134,
  fontSize = 24,
  width = 40,
  height = 40,
}) => {
  return (
    <View>
      <Image
        source={require('../../../assets/ikon/Panahkembali.png')}
        style={[styles.image0, {width, height}]}
      />
      <Image
        source={require('../../../assets/gambar/Rectangle11.png')}
        style={styles.image}
      />
      <Text style={[styles.judul, {top, left, fontSize}]}>{label}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, {top: top + 28, left: left + 47}]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default Atasan;

const styles = StyleSheet.create({
  judul: {
    position: 'absolute',
    fontSize: 24,
    color: '#2D3250',
    fontFamily: 'SedanSC-Regular',
  },
  subtitle: {
    position: 'absolute',
    fontSize: 16,
    color: '#2D3250',
    fontFamily: 'SedanSC-Regular',
  },
  image0: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: -430,
    left: -190,
  },
  image: {
    position: 'absolute',
    top: -460,
    left: -205,
  },
});
