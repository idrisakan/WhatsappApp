import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultStyle from '../../styles/defaultScreenStyle';
import PhoneInput from '../../components/ui/phoneInput';
import {useDispatch, useSelector} from 'react-redux';
import {getCoutriesCode} from '../../store/actions/authActions';
import {setPhoneNumber} from '../../store/slice/authSlice';
import FloatActionButton from '../../components/ui/floatActionButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/Colors';
import { USERREGISTIRETIONINFO } from '../../utils/routes';

const SignInWithPhone: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const {phoneNumber,selectedCountry} = useSelector(state => state.auth);
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('phone', value);
    } catch (e) {
      // saving error
    }
  };
  async function signInWithPhoneNumber() {
    const confirmation = await auth().signInWithPhoneNumber(
      `${selectedCountry.code}${phoneNumber}`,
    );

    if (confirmation.verificationId) {
      navigation.navigate(USERREGISTIRETIONINFO);
      storeData(`${selectedCountry.code}${phoneNumber}`);
    } else {
      Alert.alert('hatalı telefon numarası');
    }
  }

  useEffect(() => {
    dispatch(getCoutriesCode());
  }, []);

  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={defaultStyle.container}>
        <Text style={{fontSize: 18, textAlign: 'center', marginTop: 20}}>
          Please confirm your country code and enter your phone number
        </Text>
        <PhoneInput
          value={phoneNumber}
          onChange={(value:string) => dispatch(setPhoneNumber(value))}
        />
        <FloatActionButton
        onPress={() => signInWithPhoneNumber()}
          icon={
            <Ionicons name="arrow-forward" size={35} color={Colors.WHITE} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

//make this component available to the app
export default SignInWithPhone;
