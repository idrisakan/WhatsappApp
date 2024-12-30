import React, {useEffect, useState} from 'react';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {Text, Pressable, Image, View} from 'react-native';
import {ChatItemProps} from '../../models/ui/chatItemProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {convertFullName} from '../../utils/functions';
import moment from 'moment';

const CallItem: React.FC<ChatItemProps> = ({item}) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(item.to)
      .get()
      .then(querySnapshot => {
        setUser(querySnapshot.data());
      });
  }, []);
  const setStatus = () => {
    switch (item.status) {
      case 0:
        return 'Missed';
      case 0:
        return 'İncoming';
      case 0:
        return 'Out Coming';

      default:
        return 'Missed';
    }
  };
  return (
    <Pressable style={{flexDirection: 'row', backgroundColor: Colors.WHITE}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        {user?.profileImage ? (
          <Image
            source={{uri: user?.profileImage}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
          />
        ) : (
          <FontAwesome6 name="circle-user" size={30} color={Colors.GRAY_2} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderColor: Colors.GRAY_4,
          padding: 10,
          flex: 1,
          minHeight: 80,
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: item.status == 0 ? Colors.RED : Colors.BLACK,
              }}>
              {convertFullName(user?.name, user?.surname)}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.GRAY_2,
              }}>
              {moment(new Date(item?.timestamp?.seconds * 1000)).format(
                'DD/MM/YY',
              )}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Ionicons name="call" size={15} color={Colors.BLUE_1} />
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 16,
                  color: Colors.GRAY_2,
                  marginHorizontal: 5,
                }}>
                {setStatus()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CallItem;
