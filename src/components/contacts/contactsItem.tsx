import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../../theme/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {MESSAGE} from '../../utils/routes';
import {formatPhoneNumber} from '../../utils/functions';

// create a component
const ContactsItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();

  const checkUserExists = async () => {
    const ref = firestore().collection('Users');
    const querySnapshot = await ref

      .where('phoneNumber', 'in', item?.phoneNumbers[0].number)
      .get();
    return querySnapshot.empty;
  };

  useEffect(() => {
    // checkUserExists();
  }, []);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(MESSAGE, {recipiendPhoneNumber: formatPhoneNumber(item?.phoneNumbers[0].number), chatRoomId: null})
      }
      style={styles.container}>
      <View
        style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesome6 name="circle-user" size={35} color={Colors.GRAY_2} />
      </View>
      <View>
        <Text style={styles.text}>{item.displayName}</Text>
        <Text style={styles.phone}>
          {formatPhoneNumber(item?.phoneNumbers[0].number)}
        </Text>
      </View>
      {/* {checkUserExists() ? null : (
        <View
          style={{justifyContent: 'center', alignItems: 'flex-end', flex: 1}}>
          <Text
            style={{fontSize: 20, fontWeight: '500', color: Colors.GREEN_2}}>
            Davet Et
          </Text>
        </View>
      )} */}
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
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  phone: {
    fontSize: 18,
    color: Colors.GRAY_1,
  },
});

//make this component available to the app
export default ContactsItem;
