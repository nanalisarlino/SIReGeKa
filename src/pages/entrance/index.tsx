import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from '../../components/Atom';
import {Bawahan} from '../../components/Molekul';
import {useNavigation} from '@react-navigation/native';

const Entrance: React.FC = ({}) => {
  const navigation = useNavigation();
  const handleMasuk = () => {
    console.log('Masuk clicked');
  };

  const handleDaftar = () => {
    console.log('Daftar clicked');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/gambar/background.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.topOverlay} />

      <Image
        source={require('../../assets/gambar/bottom.png')}
        style={styles.gradientImage}
      />

      <View style={styles.overlayContent}>
        <Text style={styles.title}>Sistem Absensi RGK</Text>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.textAndButtons}>
          <Text style={styles.shallom}>SHALLOM!</Text>
          <View style={styles.buttonsContainer}>
            <Button
              title="Masuk"
              onPress={() => navigation.navigate('Sign In')}
              width={200}
            />
            <Button
              width={200}
              title="Daftar"
              onPress={() => navigation.navigate('Pilih')}
            />
          </View>
        </View>
        <Image
          source={require('../../assets/gambar/logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.footerContainer}>
        <Bawahan />
      </View>
    </View>
  );
};

export default Entrance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '75%',
    resizeMode: 'cover',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '15%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2,
  },
  gradientImage: {
    width: '100%',
    height: '25%',
    resizeMode: 'cover',
  },
  overlayContent: {
    position: 'absolute',
    top: '10%',
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'SedanSC-Regular',
    textAlign: 'center',
    top: 10,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAndButtons: {
    alignItems: 'flex-end',
    marginRight: 50,
    top: 40,
  },
  shallom: {
    fontSize: 60,
    color: 'white',
    fontWeight: '500',
    fontFamily: 'SedanSC-Regular',
    left: 190,
    color: '#2d3250',
  },
  buttonsContainer: {
    flexDirection: 'column',
    left: 200,
  },
  footerContainer: {
    position: 'absolute',
    top: 430,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 155,
    height: 167,
    left: -200,
    top: 70,
    resizeMode: 'contain',
  },
});
