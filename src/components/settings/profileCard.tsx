//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {convertFullName} from '../../utils/functions';
import Colors from '../../theme/Colors';
import {EDITPROFILE} from '../../utils/routes';
import { useNavigation } from '@react-navigation/native';


const ProfileCard: React.FC = () => {
  const navigation= useNavigation()
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
    <Pressable
      onPress={() =>
       navigation.navigate(EDITPROFILE, {user:user})
      }
      style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
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
          <FontAwesome6 name="circle-user" size={35} color={Colors.GRAY_2} />
        )}
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.text}>
          {convertFullName(user?.name, user?.surname)}
        </Text>
        <Text style={styles.status}>{user?.status}</Text>
      </View>
    </Pressable>
  );
};

// define your styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
    paddingVertical: 15,
    borderBottomColor: Colors.GRAY_4,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    color: Colors.GRAY_2,
  },
});

//make this component available to the app
export default ProfileCard;
