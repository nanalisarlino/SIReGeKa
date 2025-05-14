import React from 'react';
import {useRoute} from '@react-navigation/native';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {Atasan, Bawahan} from '../../../components/Molekul';
import {Garis, TeksBiasa} from '../../../components/Atom';
import {useNavigation} from '@react-navigation/native';

const DetailKehadiran = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handlegoback = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handlegoback}>
        <Image source={require('../../../assets/ikon/Panahkembali.png')} />
      </TouchableOpacity>
      <Atasan label={'REMAJA BAITEL KEMA'} width={1} height={1} />
      <View style={styles.bgiconplus} />
      <Text style={styles.tekstambahfoto}> Informasi Pribadi</Text>
      <TeksBiasa label={'Detail Kehadiran'} top={-160} left={-60} />
      <View style={styles.persegisaja}>
        <TeksBiasa
          label={'Arlino Abraham Timotius Nanalis'}
          top={60}
          left={40}
        />
        <TeksBiasa label={'Hadir: 17'} top={90} left={127} />
        <TeksBiasa label={'13 April'} top={160} left={127} />
        <Garis top={195} height={2} left={60} width={200} />
        <TeksBiasa label={'6 April'} top={201} left={127} />
        <Garis top={235} height={2} left={60} width={200} />
        <TeksBiasa label={'30 Maret'} top={241} left={127} />
        <Garis top={275} height={2} left={60} width={200} />
      </View>
      <Bawahan />
    </View>
  );
};

export default DetailKehadiran;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 10,
    left: 10,
    zIndex: 10,
  },
  bgiconplus: {
    position: 'absolute',
    width: 82,
    height: 84,
    top: 200,
    left: 165,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
  },
  tekstambahfoto: {
    top: -300,
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  persegisaja: {
    position: 'absolute',
    width: 330,
    height: 500,
    top: 340,
    left: 42,
    borderColor: '#757575',
    borderWidth: 2,
    backgroundColor: '#D9D9D9',
  },
});
