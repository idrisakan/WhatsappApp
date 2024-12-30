//import liraries
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultScreenStyle';
import ChatItem from '../../components/chats/chatsItem';
import firestore, {Filter} from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import FloatActionButton from '../../components/ui/floatActionButton';
import Colors from '../../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CONTACTS } from '../../utils/routes';

// create a component
const Chats: React.FC = ({navigation}) => {
  const {phoneNumber, selectedCountry} = useSelector(state => state.auth);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('ChatRooms')
      .where(
        'participants',
        'array-contains',
        `${selectedCountry.code}${phoneNumber}`)
      .onSnapshot(querySnapshot => {
        const rooms = querySnapshot?.docs.map(doc => ({
          id: doc?.id,
          ...doc.data(),
        }));
        setChats(rooms);
      });
    return () => subscribe();
  }, []);
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={[defaultStyle.container,{padding:0}]}>
        <FlatList
          ListEmptyComponent={<Text>No Messages</Text>}
          data={chats}
          renderItem={({item}) => <ChatItem item={item} />}
        />
         <FloatActionButton
         onPress={() => navigation.navigate(CONTACTS)}
          icon={
            <Ionicons name="send-outline" size={30} color={Colors.WHITE} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

//make this component available to the app
export default Chats;
