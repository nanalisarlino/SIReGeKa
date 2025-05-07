import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Button} from '../../../Komponen/Atom';
import {Bawahan} from '../../../Komponen/Molekul';
import LinearGradient from 'react-native-linear-gradient';
import Judul from '../../../Komponen/Atom/Judul';
import {createStaticNavigation, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Pilih: React.FC = () => {
  const navigation = useNavigation();

  const handlepickremaja = () => {
    navigation.navigate('Remaja Sign Up', {status: 'Remaja'});
  };

  const handlepickpembina = () => {
    navigation.navigate('Pembina Sign Up', {status: 'Pembina'});
  };

  const handlegoback = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(45, 50, 89, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.container}>
        {/* Background Image */}
        <Image
          source={require('../../../assets/gambar/bg.png')} // Sesuaikan path-nya
          style={styles.backgroundImage}
        />

        {/* Main Content */}
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <Judul label={'Daftar'} style={styles.judulbesar} />
            <View style={styles.buttonsContainer}>
              <Button title="Remaja" onPress={handlepickremaja} />
              <Button title="Pembina" onPress={handlepickpembina} />
            </View>
          </View>

          {/* Bottom Section: Back Button + Footer */}
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.backButton} onPress={handlegoback}>
              <Image
                source={require('../../../assets/ikon/Panahkembali.png')}
              />
            </TouchableOpacity>
            <Bawahan />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Pilih;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  judulbesar: {
    fontSize: 35,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 40,
    fontFamily: 'SedanSC-Regular',
    color: '#fff',
  },
  button1: {
    marginBottom: 35,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#2D3250',
  },
});
