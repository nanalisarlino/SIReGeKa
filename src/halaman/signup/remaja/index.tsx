import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import {InputText} from '../../../Komponen/Molekul';
import {Button} from '../../../Komponen/Atom';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';
import {useRoute} from '@react-navigation/native';
const RemajaSignUp: React.FC = () => {
  const navigation = useNavigation();

  const [nama, setNama] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [kolom, setKolom] = useState('');
  const [namaAyah, setNamaAyah] = useState('');
  const [namaIbu, setNamaIbu] = useState('');
  const [alamat, setAlamat] = useState('');
  const [nomorHP, setNomorHP] = useState('');
  const [password, setPassword] = useState('');

  const route = useRoute();
  const {status} = route.params;

  const handleDaftar = async () => {
    if (
      !nama ||
      !tanggalLahir ||
      !kolom ||
      !namaAyah ||
      !namaIbu ||
      !alamat ||
      !nomorHP ||
      !password
    ) {
      showMessage({
        message: 'Semua field wajib diisi.',
        type: 'danger',
      });
      return;
    }

    if (password.length < 6) {
      showMessage({
        message: 'Password minimal 6 karakter.',
        type: 'danger',
      });
      return;
    }

    const tanggalLahirRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!tanggalLahirRegex.test(tanggalLahir)) {
      showMessage({
        message: 'Format tanggal lahir harus YYYY-MM-DD.',
        type: 'danger',
      });
      return;
    }

    const auth = getAuth();
    const db = getDatabase();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        `${nomorHP}@remaja.com`, // fake email
        password,
      );

      const userId = userCredential.user.uid;

      await set(ref(db, 'remaja/' + userId), {
        nama,
        tanggalLahir,
        kolom,
        namaAyah,
        namaIbu,
        alamat,
        nomorHP,
        status,
      });

      showMessage({
        message: 'Pendaftaran berhasil.',
        type: 'success',
      });

      navigation.navigate('Remaja Dashboard', {nama, tanggalLahir, kolom});
    } catch (error) {
      console.error('Gagal daftar:', error);
      showMessage({
        message: 'Pendaftaran gagal.',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handlegoback = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/gambar/bg.png')}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={['rgba(45, 50, 89, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.linear}>
        <View style={styles.judulcontainer}>
          <Text style={styles.teks}>Daftar</Text>
          <Text style={styles.subtitle}> Remaja</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handlegoback}>
          <Image
            source={require('../../../assets/ikon/Panahkembali.png')}
            style={{tintColor: '#fff'}}
          />
        </TouchableOpacity>

        <View style={styles.buttoncontainer}>
          <TouchableOpacity>
            <View style={{marginTop: 16, alignItems: 'center'}}>
              <Button title="Daftar" onPress={handleDaftar} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
            <Text style={styles.loginText}>Masuk</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.overlay}>
          <ScrollView
            contentContainerStyle={styles.formContainer}
            showsVerticalScrollIndicator={true}>
            <InputText
              label="Nama"
              value={nama}
              onChangeText={setNama}
              placeholder="Masukkan nama lengkap"
            />
            <InputText
              label="Tanggal Lahir (YYYY-MM-DD)"
              value={tanggalLahir}
              onChangeText={setTanggalLahir}
              placeholder="Contoh: 2005-12-31"
              keyboardType="numbers-and-punctuation"
            />
            <InputText
              label="Kolom"
              value={kolom}
              onChangeText={setKolom}
              placeholder="Masukkan kolom"
            />
            <InputText
              label="Nama Ayah"
              value={namaAyah}
              onChangeText={setNamaAyah}
              placeholder="Masukkan nama ayah"
            />
            <InputText
              label="Nama Ibu"
              value={namaIbu}
              onChangeText={setNamaIbu}
              placeholder="Masukkan nama ibu"
            />
            <InputText
              label="Alamat"
              value={alamat}
              onChangeText={setAlamat}
              placeholder="Masukkan alamat rumah"
              multiline
            />
            <InputText
              label="Nomor HP (WhatsApp)"
              value={nomorHP}
              onChangeText={setNomorHP}
              placeholder="Masukkan nomor HP"
              keyboardType="phone-pad"
            />
            <InputText
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Masukkan password"
              secureTextEntry
            />
          </ScrollView>

          <View style={{height: 80}} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default RemajaSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  linear: {
    flex: 1,
    padding: 30,
  },
  buttoncontainer: {
    position: 'absolute',
    top: 750,
    left: 55,
    zIndex: 10,
  },
  judulcontainer: {
    position: 'absolute',
    top: 50,
    left: 150,
  },
  teks: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 35,
    fontFamily: 'SedanSC-Regular',
  },
  subtitle: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'league-spartan-regular',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 1,
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
  overlay: {
    flex: 1,
    marginTop: 100,

    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  formContainer: {
    paddingBottom: 10,
    zIndex: 10,
  },
  loginText: {
    position: 'absolute',
    fontSize: 15,
    color: '#2D3250',
    fontWeight: 'bold',
    top: -30,
    left: 130,
    textAlign: 'center',
  },
});
