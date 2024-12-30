//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { useSelector } from 'react-redux';

// create a component
const MessageBox: React.FC<Props> = ({item}) => {
  const {selectedCountry, phoneNumber} = useSelector(state => state.auth);
  return (
    <View
      style={
        item.from == `${selectedCountry.code}${phoneNumber}`
          ? styles.sendMessageContainer
          : styles.getMessageContainer
      }>
      <Text style={{fontSize: 18, color: 'black'}}>{item.message}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {item?.from == `${selectedCountry.code}${phoneNumber}` && (
          <Ionicons
            name="checkmark-done-outline"
            size={16}
            color={item.read ? Colors.BLUE_1 : Colors.GRAY_1}
          />
        )}
        <Text style={{fontSize: 14, color: Colors.BLACK, textAlign: 'right'}}>
          {/* {item.timestamp?.toDate().toLocaleTimeString()} */}
          {moment(new Date(item?.timestamp?.seconds * 1000)).format('HH:mm')}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  sendMessageContainer: {
    backgroundColor: Colors.GREEN_1,
    marginRight: 5,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: 350,
    minWidth: 150,
    alignSelf: 'flex-end',
  },
  getMessageContainer: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 10,
    marginLeft: 5,
    marginVertical: 10,
    maxWidth: 350,
    minWidth: 150,
    alignSelf: 'flex-start',
  },
});

//make this component available to the app
export default MessageBox;
