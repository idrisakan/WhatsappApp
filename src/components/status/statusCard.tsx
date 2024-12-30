//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {convertFullName} from '../../utils/functions';
import Colors from '../../theme/Colors';
import {EDITPROFILE, WHATSAPPSTATUS} from '../../utils/routes';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import iconSet from '../../../node_modules/react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';

const StatusCard: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const {selectedCountry, phoneNumber, name, surname} = useSelector(
    state => state.auth,
  );
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(`${selectedCountry.code}${phoneNumber}`)
      .onSnapshot(documentSnapshot => {
        setUser(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate(WHATSAPPSTATUS, {user: user})}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 25,
          right: 20,
        }}>
        {user?.profileImage ? (
          <Image
            source={{uri: user?.profileImage}}
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
            }}
          />
        ) : (
          <FontAwesome6 name="circle-user" size={50} color={Colors.BLUE_1} />
        )}
        <View
          style={{
            position: 'absolute',
            backgroundColor: Colors.BLUE_1,
            bottom: 22,
            right: 25,
            padding: 6,
            borderRadius: 100,
          }}>
          <FontAwesome6 name="plus" size={12} color={Colors.WHITE} />
        </View>
      </Pressable>

      <View style={{justifyContent: 'center'}}>
        <Text style={styles.text}>
          {convertFullName(user?.name, user?.surname)}
        </Text>
        <Text style={styles.status}>Add to my status</Text>
      </View>
      <View style={styles.myStatus}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="camera" size={20} color={Colors.BLUE_1} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome6 name="pencil" size={20} color={Colors.BLUE_1} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// define your styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderBottomColor: Colors.GRAY_4,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    right: 10,
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginBottom: 5,
    right: 60,
  },
  status: {
    fontSize: 16,
    color: Colors.GRAY_2,
    right: 60,
  },
  myStatus: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    color: Colors.BLUE_1,
  },
  icon: {
    marginHorizontal: 10,
    backgroundColor: '#EDEDFF',
    borderRadius: 30,
    padding: 6,
  },
});

//make this component available to the app
export default StatusCard;
