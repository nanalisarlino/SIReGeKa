import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {InputText} from '../../components/Molekul';
import {Button} from '../../components/Atom';
import {useNavigation} from '@react-navigation/native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {getDatabase, ref, get} from 'firebase/database';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const [nomorHP, setNomorHP] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'remaja' | 'pembina'>('remaja');

  const handleLogin = async (nomorHP, password, role, navigation) => {
    const auth = getAuth();
    const db = getDatabase();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        `${nomorHP}@remaja.com`, // login pakai nomorHP sebagai email
        password,
      );

      const uid = userCredential.user.uid;

      const snapshot = await get(ref(db, `${role}/${uid}`));

      if (!snapshot.exists()) {
        showMessage({
          message: 'Data pengguna tidak ditemukan di database.',
          type: 'danger',
        });
        return;
      }

      const userData = snapshot.val();

      if (role === 'remaja') {
        navigation.navigate('Remaja Dashboard', {...userData, uid});
      } else if (role === 'pembina') {
        navigation.navigate('Pembina Dashboard', {...userData, uid});
      }
    } catch (error) {
      console.error('Login gagal:', error);
      showMessage({
        message: 'Login gagal',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleDaftar = () => {
    navigation.navigate('Pilih');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(45, 50, 89, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.container}>
        <ImageBackground
          source={require('../../assets/gambar/bg.png')}
          style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'android' ? 'padding' : undefined}
              style={styles.keyboardAvoiding}>
              <Text style={styles.Judul}>Masuk</Text>
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
              <View style={styles.pickerContainer}>
                <Text style={styles.label}>Pilih Peran:</Text>
                <Picker
                  selectedValue={role}
                  onValueChange={itemValue => setRole(itemValue)}
                  style={styles.picker}>
                  <Picker.Item label="Remaja" value="remaja" />
                  <Picker.Item label="Pembina" value="pembina" />
                </Picker>
              </View>
              <View style={{marginTop: 50, alignItems: 'center'}}>
                <Button
                  title="Masuk"
                  onPress={() =>
                    handleLogin(nomorHP, password, role, navigation)
                  }
                />
              </View>
              <TouchableOpacity onPress={handleDaftar}>
                <Text style={styles.daftarText}>Belum punya akun? Daftar</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  Judul: {
    fontSize: 35,
    marginTop: 272,
    marginBottom: 30,
    width: 372,
    height: 42,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'SedanSC-Regular',
  },
  overlay: {
    flex: 1,
    width: 412,
    height: 917,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 30,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  label: {
    marginBottom: 0,
    fontWeight: '600',
  },
  contentContainer: {
    marginTop: 278,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: 193,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
    padding: 3,
  },
  picker: {
    width: '100%',
    color: '#2D3250',
  },
  daftarText: {
    fontSize: 15,
    marginTop: 16,
    color: '#2D3250',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
