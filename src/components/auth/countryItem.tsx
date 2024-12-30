import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../../theme/Colors';
import {CountryItemProps} from '../../models/ui/countryItem';
import {useDispatch} from 'react-redux';
import {setCountry} from '../../store/slice/authSlice';
import {useNavigation} from '@react-navigation/native';

// create a component
const CountryItem: React.FC<CountryItemProps> = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        dispatch(setCountry(item));
        navigation.goBack();
        
      }}
      style={styles.container}>
      <Text style={styles.text}>{item.country}</Text>
      <Text style={styles.text}>{item.code}</Text>
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingVertical: 15,
    borderBottomColor: Colors.GRAY_4,
    borderBottomWidth: 0.5,
  },
  text: {fontSize: 18, color: Colors.BLUE_1},
});

//make this component available to the app
export default CountryItem;
