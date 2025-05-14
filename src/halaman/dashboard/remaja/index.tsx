import React from 'react';
import {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {Atasan, Bawahan} from '../../../Komponen/Molekul';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, get} from 'firebase/database';

// Static image map for local assets
const iconMap: Record<string, any> = {
  personal: require('../../../assets/ikon/personal.png'),
  jadwal: require('../../../assets/ikon/jadwal.png'),
  logout: require('../../../assets/ikon/logout.png'),
};

const RemajaDashboard: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {nama, tanggalLahir, kolom} = route.params || {};

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const db = getDatabase();
      const userRef = ref(db, `users/${uid}`);
      get(userRef).then(snapshot => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      });
    }
  }, []);

  const menuItems = [
    {
      icon: 'personal',
      label: 'Informasi Pribadi',
      onPress: () => {
        navigation.navigate('Main Profile', {nama, tanggalLahir, kolom});
      },
    },
    {
      icon: 'jadwal',
      label: 'Jadwal Ibadah',
      onPress: () => {
        navigation.navigate('Jadwal Ibadah');
      },
    },
    {
      icon: 'logout',
      label: 'Log Out',
      onPress: () => {
        navigation.navigate('Entrance');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/gambar/bg.png')}
        style={styles.backgroundImage}>
        <Atasan label="Remaja Baitel Kema" top={45} left={40} fontSize={35} />
        <View style={styles.overlay}>
          <View style={styles.gridContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}>
                <View style={styles.logoContainer}>
                  <Image
                    source={iconMap[item.icon]}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Bawahan />
        </View>
      </ImageBackground>
    </View>
  );
};

export default RemajaDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(45, 50, 89, 0.5)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    height: '25%', // Only cover top 25%// Navy color
    paddingHorizontal: 30,
    paddingTop: 100,
    justifyContent: 'space-between',
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
    rowGap: 20,
  },
  menuItem: {
    width: '47%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  logoContainer: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  menuLabel: {
    fontSize: 14,
    color: '#2D3250',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    top: 235,
  },
});
