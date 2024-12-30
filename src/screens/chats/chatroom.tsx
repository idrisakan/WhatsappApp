//import liraries
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import defaultStyle from '../../styles/defaultScreenStyle';
import MessageBox from '../../components/chats/messageBox';
import ContactHeader from '../../components/router/contactHeader';
import Colors from '../../theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
const ChatRoom: React.FC = ({route}) => {
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState(route?.params?.chatRoomId);
  const [loading, setLoading] = useState(false);
  const recipiendPhoneNumber = route?.params?.recipiendPhoneNumber;
  const {selectedCountry, phoneNumber} = useSelector(state => state.auth);
  const currentUserId = `${selectedCountry.code}${phoneNumber}`;
  const [chats, setChats] = useState('');
  const sendMessage = async chatRoomId => {
    await firestore()
      .collection('ChatRooms')
      .doc(chatRoomId)
      .collection('messages')
      .add({
        from: currentUserId,
        message: message,
        timestamp: firestore.FieldValue.serverTimestamp(),
        read: false,
      })
      .then(() => {
        setMessage('');
      });
    await firestore().collection('ChatRooms').doc(chatRoomId).update({
      lastMessage: message,
      lastMessageTime: firestore.FieldValue.serverTimestamp(),
    });
  };
  const newChatRoom = async (recipiendId: string) => {
    const currentUserId = `${selectedCountry.code}${phoneNumber}`;
    const chatroomsRef = firestore().collection('ChatRooms');
    const exitingChatRoom = await chatroomsRef
      .where('participants', '==', [currentUserId, recipiendId])
      .get();
    let chatroomId;
    if (exitingChatRoom.size === 0) {
      const newChatRoom = await chatroomsRef.add({
        participants: [currentUserId, recipiendId],
        lastMessage: '',
        lastMessageTime: firestore.FieldValue.serverTimestamp(),
      });
      chatroomId = newChatRoom.id;
    } else {
      chatroomId = exitingChatRoom.docs[0].id;
    }
    return chatroomId;
  };

  const sendMessageToNewChat = async recipiendId => {
    console.log('recipiendId ', recipiendId);
    if (roomId) await sendMessage(roomId);
    else {
      const chatRoomId = await newChatRoom(recipiendId);
      setRoomId(chatRoomId);
      await sendMessage(chatRoomId);
    }
  };

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('ChatRooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot?.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        messages && setChats(messages);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          width: '80%',
          height: 120,
          backgroundColor: Colors.YELLOW,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          marginTop: 30,
          alignSelf: 'center',
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 16,
            padding: 5,
            fontWeight: '500',
            textAlign: 'center',
            color: Colors.BLACK,
          }}>
          Mesajlar ve aramalar uçtan uca şifrelidir
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <ContactHeader recipiendPhoneNumber={recipiendPhoneNumber} />
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/back1.png')}
          style={{flex: 1}}>
          {loading ? (
            <ActivityIndicator size={'small'} color={Colors.GRAY_2}/>
          ) : (
            <FlatList
              ListEmptyComponent={ListEmptyComponent}
              data={chats}
              renderItem={({item}) => <MessageBox item={item} />}
            />
          )}
          {/* <FlatList
            ListEmptyComponent={ListEmptyComponent}
            data={chats}
            renderItem={({item}) => <MessageBox item={item} />}
          /> */}
        </ImageBackground>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            height: 80,
            borderTopWidth: 0.5,
            borderColor: Colors.GRAY_1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <AntDesign name="plus" size={35} color={Colors.BLUE_1} />

          <TextInput
            value={message}
            onChangeText={value => setMessage(value)}
            style={{
              borderWidth: 0.5,
              borderRadius: 1000,
              flex: 1,
              margin: 10,
              padding: 10,
              maxHeight: 40,
              fontSize: 18,
            }}
          />
          <View style={{flexDirection: 'row', marginHorizontal: 15}}>
            <Pressable
              onPress={() => sendMessageToNewChat(recipiendPhoneNumber)}>
              <MaterialCommunityIcons
                name="send"
                size={35}
                color={Colors.BLUE_1}
              />
            </Pressable>
          
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
