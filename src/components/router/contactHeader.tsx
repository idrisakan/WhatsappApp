import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import Colors from '../../theme/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {convertFullName} from '../../utils/functions';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {USERCALL} from '../../utils/routes';
// create a component
const ContactHeader: React.FC<Props> = ({recipiendPhoneNumber}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const userCall = async () => {
    await firestore()
      .collection('Calls')
      // .doc(chatRoomId)
      // .collection('messages')
      .add({
        from: user.phoneNumber,
        to: recipiendPhoneNumber,
        timestamp: firestore.FieldValue.serverTimestamp(),
        time: 0,
        status: 0,
      })
      .then(data => {
        console.log(data.id);
        navigation.navigate(USERCALL, {user: user});
        callId: data.id;
      });
  };
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(recipiendPhoneNumber)
      .onSnapshot(querySnapshot => {
        setUser(querySnapshot.data());
      });
  }, []);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <FontAwesome6 name="arrow-left" size={20} color={Colors.BLACK} />
      </Pressable>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginLeft: 10,
        }}>
        <View>
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

        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            {convertFullName(user?.name, user?.surname)}
          </Text>
          {user?.isOnline ? (
            <Text style={{fontSize: 16, color: Colors.GREEN_2}}>Online</Text>
          ) : (
            <Text style={{fontSize: 16, color: 'gray'}}>
              last Seen:
              {moment(new Date(user?.lastSeen?.seconds * 1000)).format('HH:mm')}
            </Text>
          )}
        </View>
      </View>
      <Pressable onPress={() => userCall()}>
        <Ionicons name="call-outline" size={30} color={Colors.BLUE_1} />
      </Pressable>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});

//make this component available to the app
export default ContactHeader;
