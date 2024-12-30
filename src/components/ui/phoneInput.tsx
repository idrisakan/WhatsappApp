import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, StyleSheet, TextInput, Pressable, Text} from 'react-native';
import Colors from '../../theme/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { COUNTRIESCODE } from '../../utils/routes';

// interface Props {
//   onChange: (value: string) => void;
//   value: string;
// }
const PhoneInput: React.FC<Props> = ({onChange, value}) => {
  const {selectedCountry} = useSelector(state => state.auth);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.selectCountry}
        onPress={() => navigation.navigate(COUNTRIESCODE)}>
        <Text style={styles.country}>{selectedCountry?.country}</Text>
        <Feather name="chevron-right" size={25} color={Colors.GRAY_4} />
      </Pressable>
      <View style={styles.inputContainer}>
        <View
          style={{
            borderRightWidth: 0.5,
            paddingHorizontal: 5,
          }}>
          <Text style={styles.countryCode}>{selectedCountry?.code}</Text>
        </View>
        <TextInput
          value={value}
          // onChangeText={value =>onChange(value)}
          onChangeText={onChange}
          keyboardType="number-pad"
          style={styles.input}
          placeholder="phone number"
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: Colors.GRAY_3,
    fontSize: 24,
    padding: 10,
  },
  selectCountry: {
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.GRAY_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  country: {
    fontSize: 18,
    color: Colors.BLUE_1,
  },
  countryCode: {fontSize: 24, color: Colors.GRAY_1},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
});

export default PhoneInput;
