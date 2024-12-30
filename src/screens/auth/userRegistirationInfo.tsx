//import liraries
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Input from '../../components/ui/Input';
import {useDispatch, useSelector} from 'react-redux';
import {setName, setPhoneNumber, setSurname} from '../../store/slice/authSlice';
import FloatActionButton from '../../components/ui/floatActionButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/Colors';
import { TABNAVIGATOR } from '../../utils/routes';

// create a component
const UserRegistirationInfo: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const {name, surname, phoneNumber,selectedCountry,status} = useSelector(state => state.auth);
  const createUser = async () => {
    await firestore()
      .collection('Users')
      .doc(`${selectedCountry.code}${phoneNumber}`)
      .set({
        phoneNumber: `${selectedCountry.code}${phoneNumber}`,
        name: name,
        surname: surname,
        lastSeen: firestore.FieldValue.serverTimestamp(),
        createTime: firestore.FieldValue.serverTimestamp(),
        isOnline: true,
        status:'Müsait',
        profileImage:'',
      })
      .then(() => {
        navigation.navigate(TABNAVIGATOR);
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Input
          value={phoneNumber}
          placeholder="Phone Number"
          onChange={(value: string) => dispatch(setPhoneNumber(value))}
        />
        <Input
          value={name}
          placeholder="Name"
          onChange={(value: string) => dispatch(setName(value))}
        />
        <Input
          value={surname}
          placeholder="Surname"
          onChange={(value: string) => dispatch(setSurname(value))}
        />
      
         <FloatActionButton
         onPress={() => createUser()}
          icon={
            <Ionicons name="arrow-forward" size={35} color={Colors.WHITE} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default UserRegistirationInfo;
