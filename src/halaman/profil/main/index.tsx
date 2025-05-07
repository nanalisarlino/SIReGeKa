import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Atasan, Bawahan} from '../../../Komponen/Molekul';
import {TeksBiasa, TeksLink} from '../../../Komponen/Atom';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {getDatabase, ref, onValue, update} from 'firebase/database';
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
  // Use the auth context

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

          // Upload image to Firebase Storage
          const storage = getStorage();
          const imageRef = storageRef(storage, `profile_images/${uid}`);

          // Convert image to blob for upload
          fetch(uri)
            .then(response => response.blob())
            .then(blob => {
              uploadBytes(imageRef, blob)
                .then(() => getDownloadURL(imageRef))
                .then(downloadUrl => {
                  // Determine which collection to update based on role
                  const collection =
                    userData?.role === 'pembina' ? 'pembina' : 'users';
                  // Update user profile with image URL
                  const db = getDatabase();
                  const userRef = ref(db, `${collection}/${uid}`);
                  update(userRef, {
                    profileImage: downloadUrl,
                  });
                })
                .catch(error => console.error('Error uploading image:', error));
            })
            .catch(error => console.error('Error fetching image blob:', error));
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
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}

      <Text style={styles.tekstambahfoto}> Informasi Pribadi</Text>

      <Image
        source={require('../../../assets/ikon/+.png')}
        style={styles.iconplus}
      />

      <TeksBiasa label={`Nama : ${nama}`} top={-130} />
      <TeksBiasa label={`Tanggal Lahir : ${tanggalLahir}`} top={-90} />
      <TeksBiasa label={`Kolom : ${kolom}`} top={-50} />

      <View style={styles.garis} />
      <TeksBiasa label={'3 Kali Hadir'} top={50} left={-50} />
      <TeksLink
        label={'Lihat Detail'}
        top={85}
        left={-43}
        onPress={() => {
          navigation.navigate('Detail Kehadiran', {
            imageUri: imageUri,
          });
        }}
      />

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
