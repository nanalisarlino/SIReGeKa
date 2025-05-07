import React from 'react';
import 'react-native-gesture-handler';
// import lainnya...
//import file
import Entrance from './halaman/entrance';
import JadwalIbadah from './halaman/JadwalIbadah';
import {DetailKehadiran, MainProfile} from './halaman/profil';
import SignIn from './halaman/signin';
import {PembinaSignUp, Pilih, RemajaSignUp} from './halaman/signup';
import Statistik from './halaman/statistik';

//import navigation stuff
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RemajaDashboard from './halaman/dashboard/remaja';
import PembinaDashboard from './halaman/dashboard/pembina';

import './config/Firebase';
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const Routing = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Entrance"
          component={Entrance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Jadwal Ibadah"
          component={JadwalIbadah}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail Kehadiran"
          component={DetailKehadiran}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main Profile"
          component={MainProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pembina Sign Up"
          component={PembinaSignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pilih"
          component={Pilih}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Remaja Sign Up"
          component={RemajaSignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Statistik"
          component={Statistik}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Remaja Dashboard"
          component={RemajaDashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pembina Dashboard"
          component={PembinaDashboard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Routing;
