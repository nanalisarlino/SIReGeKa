import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const JadwalIbadah = () => {
  const navigation = useNavigation();

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const scheduleData = [
    {
      id: 1,
      date: 'Sabtu, 12 April 2025',
      leader: 'Kak Arlino Nanalis',
      role: 'Di rumah Vallerie Salindeho',
      icon: '',
      info: 'Informasi Selengkapnya >>>',
      detailTitle: 'Ibadah Remaja Gema Kasih',
      worshipType: 'Khadim',
      mc: 'Meilyan Siwy',
    },
    {
      id: 2,
      date: 'Sabtu, 5 April 2025',
      leader: 'Kak Meilyan Siwy',
      role: 'Di rumah Riana Keni',
      icon: '',
      info: 'Informasi Selengkapnya >>>',
      detailTitle: 'Ibadah Remaja Gema Kasih',
      worshipType: 'Khadim',
      mc: 'Given Pantouw',
    },
    {
      id: 3,
      date: 'Jumat, 29 Maret 2025',
      leader: 'Kak Christopher Cornellisz',
      role: 'Di rumah Efrat Muntu',
      icon: '',
      info: 'Informasi Selengkapnya >>>',
      detailTitle: 'Ibadah Remaja Gema Kasih',
      worshipType: 'Khadim',
      mc: 'Arlino Nanalis',
    },
  ];

  const handleSchedulePress = schedule => {
    setSelectedSchedule(schedule);
    setShowDetailModal(true);
  };

  const renderScheduleItem = schedule => {
    return (
      <TouchableOpacity
        key={schedule.id}
        style={styles.scheduleItem}
        onPress={() => handleSchedulePress(schedule)}>
        <View style={styles.scheduleContent}>
          <View style={styles.scheduleLeft}>
            <Text style={styles.scheduleDate}>{schedule.date}</Text>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage} />
            </View>
          </View>
          <View style={styles.scheduleRight}>
            <Text style={styles.leaderName}>{schedule.leader}</Text>
            <Text style={styles.roleText}>
              {schedule.role} {schedule.icon}
            </Text>
            <Text style={styles.infoText}>{schedule.info}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDetailModal = () => {
    if (!selectedSchedule) return null;
    return (
      <Modal
        visible={showDetailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setShowDetailModal(false)}>
                <Ionicons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>REMAJA BAITEL KEMA</Text>
            </View>

            <View style={styles.calendarIconContainer}>
              <Ionicons name="calendar" size={30} color="black" />
              <Text style={styles.jadwalIbadahText}>Jadwal Ibadah</Text>
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>
                {selectedSchedule.detailTitle}
              </Text>

              <Text style={styles.worshipTypeText}>
                {selectedSchedule.worshipType}
              </Text>

              <View style={styles.profileImageContainerLarge}>
                <View style={styles.profileImageLarge} />
              </View>

              <Text style={styles.leaderNameDetail}>
                {selectedSchedule.leader}
              </Text>

              <View style={styles.divider} />

              <Text style={styles.roleTextDetail}>
                {selectedSchedule.role}
                {selectedSchedule.icon ? ` ${selectedSchedule.icon}` : ''}
              </Text>

              <Text style={styles.mcLabel}>MC:</Text>
              <Text style={styles.mcName}>{selectedSchedule.mc}</Text>

              <View style={styles.komisiFooter}>
                <Text style={styles.komisiText}>
                  Komisi Pelayanan Remaja "Gema Kasih"
                </Text>
                <Text style={styles.churchText}>GMIM BAITEL KEMA II</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/gambar/bg.png')} // Sesuaikan path gambar background Anda
      style={styles.backgroundImage}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.8)', 'rgba(45, 50, 89, 0.9)']}
        style={styles.container}>
        <View>
          <Image
            source={require('../../assets/gambar/Rectangle11.png')}
            style={styles.image0}
          />
          <Text style={styles.judul}>REMAJA GEMA KASIH</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/ikon/Panahkembali.png')}
              style={styles.image1}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Ionicons
            style={styles.calendar}
            name="calendar"
            size={30}
            color="black"
          />
          <Text style={styles.jadwalIbadahText}>Jadwal Ibadah</Text>
        </View>

        <ScrollView style={styles.scrollContent}>
          {scheduleData.map(schedule => renderScheduleItem(schedule))}
        </ScrollView>

        {renderDetailModal()}
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  calendar: {
    position: 'absolute',
    top: 140,
    left: 180,
  },
  judul: {
    position: 'absolute',
    fontSize: 24,
    color: '#2D3250',
    fontFamily: 'SedanSC-Regular',
    top: 40,
    left: 75,
  },
  image0: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image1: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 10,
    left: 14,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  backButton: {
    padding: 5,
  },
  jadwalIbadahText: {
    color: '#000',
    marginTop: 5,
    top: 170,
    left: 150,
  },
  scrollContent: {
    flex: 1,
    top: 200,
  },
  scheduleItem: {
    backgroundColor: '#3b466e',
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    width: 350,
    height: 150,
    left: 30,
  },
  scheduleContent: {
    flexDirection: 'row',
    padding: 20,
  },
  scheduleLeft: {
    marginRight: 15,
    alignItems: 'center',
  },
  scheduleDate: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2c3253',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  scheduleRight: {
    flex: 1,
  },
  leaderName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'league-spartan-regular',
  },
  roleText: {
    color: 'white',
    marginTop: 5,
    fontSize: 14,
  },
  infoText: {
    color: 'white',
    marginTop: 20,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.9,
    height: '80%',
    backgroundColor: '#3b466e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b466e',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  modalHeaderTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  calendarIconContainer: {
    alignItems: 'center',
    backgroundColor: '#3b466e',
    paddingBottom: 15,
  },
  detailContent: {
    flex: 1,
    backgroundColor: '#3b466e',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  detailTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  worshipTypeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  profileImageContainerLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2c3253',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15,
  },
  profileImageLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'black',
  },
  leaderNameDetail: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 15,
  },
  roleTextDetail: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  mcLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  mcName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  komisiFooter: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  komisiText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  churchText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default JadwalIbadah;
