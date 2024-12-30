//import liraries
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  CONTACTS,
  COUNTRIESCODE,
  EDITPROFILE,
  MESSAGE,
  PHONENUMBER,
  TABNAVIGATOR,
  USERCALL,
  USERREGISTIRETIONINFO,
} from '../utils/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './tabNavigation';
import {Alert, AppState, Pressable, Text, TouchableOpacity} from 'react-native';
import UserRegistirationInfo from '../screens/auth/userRegistirationInfo';
import CountriesCode from '../screens/auth/countriesCode';
import Message from '../screens/chats/chatroom';
import {useSelector} from 'react-redux';
import Contacts from '../screens/contacts';
import {APPSTATE} from '../utils/constant';
import EditProfile from '../screens/profile/editProfile';
import SignInWithPhone from '../screens/auth/signInWithPhone';
import UserCall from '../screens/calls/userCall';
import Colors from '../theme/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const RootNavigation: React.FC = () => {
  const {phoneNumber, selectedCountry} = useSelector(state => state.auth);
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppstate => {
        if (nextAppstate == APPSTATE.ACTIVE) {
          firestore()
            .collection('Users')
            .doc(`${selectedCountry.code}${phoneNumber}`)
            .update({
              isOnline: true,
              lastSeen: firestore.FieldValue.serverTimestamp(),
            });
        } else {
          firestore()
            .collection('Users')
            .doc(`${selectedCountry.code}${phoneNumber}`)
            .update({
              isOnline: false,
              lastSeen: firestore.FieldValue.serverTimestamp(),
            });
        }
      },
    );
    return () => subscription;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Back',
        headerTitleAlign: 'center',
        headerShadowVisible: 'false',
      }}>
      <Stack.Screen name={PHONENUMBER} component={SignInWithPhone} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={TABNAVIGATOR}
        component={TabNavigation}
      />

      <Stack.Screen
        name={USERREGISTIRETIONINFO}
        component={UserRegistirationInfo}
      />
      <Stack.Screen name={EDITPROFILE} component={EditProfile} />
      <Stack.Screen name={COUNTRIESCODE} component={CountriesCode} />
      <Stack.Screen name={CONTACTS} component={Contacts} />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={MESSAGE}
        component={Message}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.BLACK,
          },
          headerTintColor: Colors.WHITE,
          headerRight: () => (
            <Pressable>
              <FontAwesome6 name="user-plus" size={22} color={Colors.WHITE} />
            </Pressable>
          ),
        }}
        name={USERCALL}
        component={UserCall}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;
