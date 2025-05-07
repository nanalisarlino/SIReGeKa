import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createStaticNavigation, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Data untuk contoh anggota
const DUMMY_MEMBERS = [
  {
    id: '1',
    name: 'Arlino Abraham Timotius Nanalis',
    age: 17,
    attendance: ['2023-04-01', '2023-04-08', '2023-04-15'],
  },
  {
    id: '2',
    name: 'Pinkan Claudia Putri Samah',
    age: 17,
    attendance: ['2023-04-01', '2023-04-15'],
  },
  {
    id: '3',
    name: 'Joy Joaquin Montolalu',
    age: 15,
    attendance: ['2023-04-01', '2023-04-08'],
  },
  {
    id: '4',
    name: 'Christopher Timothy Cornelisz',
    age: 14,
    attendance: ['2023-04-15'],
  },
  {
    id: '5',
    name: 'Yesaya Efrat Muntu',
    age: 14,
    attendance: ['2023-04-01', '2023-04-08', '2023-04-15'],
  },
  {id: '6', name: 'Gabriella Guillermo', age: 13, attendance: ['2023-04-01']},
  {
    id: '7',
    name: 'Sherina Takarapateng',
    age: 13,
    attendance: ['2023-04-08', '2023-04-15'],
  },
  {
    id: '8',
    name: 'Michelle Eunika Militia Samah',
    age: 13,
    attendance: ['2023-04-01', '2023-04-15'],
  },
  {
    id: '9',
    name: 'Timothy Toreh',
    age: 12,
    attendance: ['2023-04-01', '2023-04-08'],
  },
  {
    id: '10',
    name: 'Syalom Toreh',
    age: 12,
    attendance: ['2023-04-08', '2023-04-15'],
  },
  {id: '11', name: 'Charly Mamuntu', age: 12, attendance: ['2023-04-01']},
];

type StatistikProps = {
  route: {
    params: {
      nama: string;
      tanggalLahir: string;
    };
  };
};

const Statistik = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const calculateAge = (tanggalLahirString: string): number => {
    const tanggalLahir = new Date(tanggalLahirString);
    const today = new Date();

    let age = today.getFullYear() - tanggalLahir.getFullYear();
    const m = today.getMonth() - tanggalLahir.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < tanggalLahir.getDate())) {
      age--;
    }

    return age;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(DUMMY_MEMBERS);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAttendance, setShowAttendance] = useState(false);

  // Filter anggota berdasarkan query pencarian
  useEffect(() => {
    const filtered = DUMMY_MEMBERS.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredMembers(filtered);
  }, [searchQuery]);

  // Handler untuk memilih anggota
  const handleSelectMember = member => {
    setSelectedMember(member);
    setShowAttendance(true);
  };

  // Handler untuk kembali ke daftar anggota
  const handleBackToList = () => {
    setShowAttendance(false);
  };

  // Komponen untuk menampilkan item anggota
  const MemberItem = ({item}) => (
    <TouchableOpacity
      style={styles.memberItem}
      onPress={() => handleSelectMember(item)}>
      <Text style={styles.memberName}>{item.name}</Text>
      <View style={styles.ageContainer}>
        <Text style={styles.memberAge}>{item.age}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/gambar/bg.png')} // Sesuaikan path gambar background Anda
      style={styles.backgroundImage}>
      <LinearGradient
        colors={['rgba(45, 50, 89, 0.9)', 'rgba(255, 255, 255, 0.8)']}
        style={styles.container}>
        <Image
          source={require('../../assets/gambar/Rectangle11.png')}
          style={styles.image}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/ikon/Panahkembali.png')}
            style={styles.image0}
          />
        </TouchableOpacity>
        <Text style={styles.judul}>ABSENSI REMAJA & PEMBINA</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/ikon/Statistik.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.mainContainer}>
          {!showAttendance ? (
            // Tampilan daftar anggota
            <>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Masukkan nama atau ID..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton}>
                  <Text style={styles.searchButtonText}>Lihat</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.noteText}>
                Klik pada jemaat berikut untuk melihat kehadiran...
              </Text>

              <FlatList
                data={filteredMembers}
                renderItem={({item}) => <MemberItem item={item} />}
                keyExtractor={item => item.id}
                style={styles.memberList}
              />
            </>
          ) : (
            // Tampilan detail kehadiran
            <View style={styles.attendanceContainer}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Masukkan nama atau ID..."
                  value={selectedMember?.name || ''}
                  editable={false}
                />
              </View>

              <View style={styles.memberDetailContainer}>
                <Text style={styles.selectedMemberName}>
                  {selectedMember?.name}
                </Text>
                <Text style={styles.selectedMemberAge}>
                  Hadir - {selectedMember?.age}
                </Text>
              </View>

              <View style={styles.attendanceList}>
                <Text style={styles.attendanceLabel}>Tanggal Absen</Text>
                {selectedMember?.attendance.map((date, index) => (
                  <View key={index} style={styles.dateRow}>
                    <Text style={styles.dateText}>{date}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.konfirmasiButton}
                onPress={showAttendance ? handleBackToList : null}>
                <Text style={styles.konfirmasiButtonText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  judul: {
    position: 'absolute',
    left: 30,
    top: 55,
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'SedanSC-Regular',
  },
  image0: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 15,
    left: 10,
    tintColor: '#fff',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    // style lainnya tetap sama
  },
  mainContainer: {
    width: 360,
    height: 600,
    backgroundColor: '#FFFFFF',
    padding: 15,
    top: 170,
    left: 25,
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 60,
    height: 60,
    tintColor: '#fff',
    top: 160,
  },
  logoText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: '#676f9d',
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 5,
    fontSize: 14,
    color: '#fff',
  },
  searchButton: {
    backgroundColor: '#676f9d',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noteText: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  memberList: {
    flex: 1,
    margin: 2,
  },
  memberItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberName: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 14,
    fontFamily: 'league-spartan-regular',
    color: '#000',
  },
  ageContainer: {
    backgroundColor: '#676f9d',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 7,
    width: 30,
    alignItems: 'center',
  },
  memberAge: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footerContainer: {
    marginTop: 10,
  },
  footer: {
    color: '#ccc',
    fontSize: 10,
    textAlign: 'center',
  },
  attendanceContainer: {
    flex: 1,
  },
  memberDetailContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  selectedMemberName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  selectedMemberAge: {
    color: '#fff',
    fontSize: 14,
    top: 100,
    left: 100,
  },
  attendanceList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  attendanceLabel: {
    color: '#000',
    fontSize: 14,
    marginBottom: 10,
    top: -80,
  },
  dateRow: {
    width: '100%',
    backgroundColor: '#676f9d',
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    top: -75,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
  },
  konfirmasiButton: {
    backgroundColor: '#2d3250',
    borderRadius: 5,
    padding: 12,
    width: '30%',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  konfirmasiButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Statistik;
