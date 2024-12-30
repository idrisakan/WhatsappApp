import React, {useEffect, useState} from 'react';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {Text, Pressable, Image, View} from 'react-native';
import {ChatItemProps} from '../../models/ui/chatItemProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {MESSAGE} from '../../utils/routes';
import {convertFullName} from '../../utils/functions';
import moment from 'moment';
import {useSelector} from 'react-redux';

const ChatItem: React.FC<ChatItemProps> = ({item}) => {
  const [user, setUser] = useState('');
  const [count, setCount] = useState(0);
  const {selectedCountry, phoneNumber} = useSelector(state => state.auth);

  const navigation = useNavigation();
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(
        `${selectedCountry.code}${phoneNumber}` === item?.participants[0]
          ? item?.participants[1]
          : item?.participants[0],
      )
      .get()
      .then(querySnapshot => {
        setUser(querySnapshot.data());
      });
  }, []);
  const getUnreadMessageCount = async () => {
    const messageRef = await firestore()
      .collection('ChatRooms')
      .doc(item.id)
      .collection('messages');

    const count = await messageRef.where('read', '==', false).get();
    setCount(count.size);
  };
  useEffect(() => {
    // const subscribe = firestore()
    //   .collection('ChatRooms')
    //   .doc(item.id)
    //   .collection('messages')
    //   .where(
    //     Filter.and(
    //       Filter('read', '==', false),
    //       Filter('from', '!=', '+905356361767'),
    //     ),
    //   )
    //   .onSnapshot(querySnapshot => {
    //     const count = querySnapshot?.docs.length
    //     console.log('count',count)
    //     setCount(count);
    //   });
    // return () => subscribe();
    getUnreadMessageCount();
  }, []);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(MESSAGE, {
          recipiendPhoneNumber: user.phoneNumber,
          chatRoomId: item.id,
        })
      }
      style={{flexDirection: 'row', backgroundColor: Colors.WHITE}}>
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
              width: 70,
              height: 70,
              borderRadius: 100,
            }}
          />
        ) : (
          <FontAwesome6 name="circle-user" size={35} color={Colors.GRAY_2} />
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
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              {convertFullName(user?.name, user?.surname)}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.GRAY_2,
              }}>
              {moment(new Date(item?.lastMessageTime?.seconds * 1000)).format(
                'HH:mm',
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
              <Ionicons
                name="checkmark-done-outline"
                size={20}
                color={Colors.BLUE_1}
              />
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 16,
                  color: Colors.GRAY_2,
                  marginHorizontal: 5,
                }}>
                {item.lastMessage}
              </Text>
            </View>

            {count != 0 && (
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 100,
                  backgroundColor: Colors.GREEN_2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.WHITE, fontWeight: '700'}}>
                  {count}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;
