import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Atasan, Bawahan} from '../../../Komponen/Molekul';
import {TeksBiasa, TeksLink} from '../../../Komponen/Atom';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {getDatabase, ref, onValue, update} from 'firebase/database';
import {getAuth} from 'firebase/auth';

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {useRoute} from '@react-navigation/native'; // Import AuthContext

const MainProfile = () => {
  const route = useRoute();
  const {nama, tanggalLahir, kolom} = route.params || {};
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const db = getDatabase();
    const userRef = ref(db, `pembina/${uid}`);

    const unsubscribe = onValue(userRef, snapshot => {
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        console.log('No data available');
      }
    });

    return () => unsubscribe();
  }, [uid]);

  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setImageUri(uri);

          const storage = getStorage();
          const imageRef = storageRef(storage, `profile_images/${uid}.jpg`);

          // Convert to blob and upload
          fetch(uri)
            .then(res => res.blob())
            .then(blob => uploadBytes(imageRef, blob))
            .then(() => getDownloadURL(imageRef))
            .then(downloadUrl => {
              const db = getDatabase();
              const userRef = ref(db, `pembina/${uid}`);
              return update(userRef, {profileImage: downloadUrl});
            })
            .then(() => {
              console.log('Image uploaded and URL updated in database');
            })
            .catch(err => console.error('Upload error: ', err));
        }
      },
    );
  };

  // Get user status from AuthContext or localUserData
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image source={require('../../../assets/ikon/Panahkembali.png')} />
      </TouchableOpacity>
      <Atasan label={'REMAJA BAITEL KEMA'} />

      {/* Tombol untuk memilih gambar */}
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.bgiconplus} />
      </TouchableOpacity>

      {/* Menampilkan gambar yang dipilih jika ada */}

      <Text style={styles.tekstambahfoto}> Informasi Pribadi</Text>

      <Image
        source={require('../../../assets/ikon/+.png')}
        style={styles.iconplus}
      />

      <TeksBiasa label={`Nama : ${userData?.nama || '-'}`} top={-130} />
      <TeksBiasa
        label={`Tanggal Lahir : ${userData?.tanggalLahir || '-'}`}
        top={-90}
      />
      <TeksBiasa label={`Kolom : ${userData?.kolom || '-'}`} top={-50} />

      {/* <TeksLink
        label={'Lihat Detail'}
        top={85}
        left={-43}
        onPress={() => {
          navigation.navigate('Detail Kehadiran', {
            imageUri: imageUri,
          });
        }}
      /> */}

      <Bawahan />
    </View>
  );
};

export default MainProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  garis: {
    height: 3,
    backgroundColor: '#757575',
    width: '65%',
    top: 30,
  },
  backButton: {
    position: 'absolute',
    width: 10,
    height: 50,
    top: 10,
    left: 10,
    zIndex: 10,
  },
  image0: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: -430,
    left: -190,
  },
  bgiconplus: {
    position: 'absolute',
    width: 82,
    height: 84,
    top: -245,
    left: -40,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
  },
  iconplus: {
    position: 'absolute',
    width: 35,
    height: 37,
    top: 225,
  },
  tekstambahfoto: {
    top: -300,
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  qr: {
    position: 'absolute',
    width: 198,
    height: 198,
    top: 590,
    left: 100,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
