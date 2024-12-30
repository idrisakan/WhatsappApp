//import liraries
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultScreenStyle';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import CallItem from '../../components/call/callItem';
import { USERCALL } from '../../utils/routes';

// create a component
const Calls: React.FC = ({navigation}) => {
  const {selectedCountry, phoneNumber} = useSelector(state => state.auth);
  const [calls, setCall] = useState([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('Calls')
    //   .where('from', '!=', `${selectedCountry.code}${phoneNumber}`)
      .onSnapshot(querySnapshot => {
        const calls = querySnapshot?.docs.map(doc => ({
          id: doc?.id,
          ...doc.data(),
        }));
        console.log(calls);
        navigation.navigate(USERCALL)
        setCall(calls);
      });
    return () => subscribe();
  }, []);
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={defaultStyle.container}>
        <FlatList
          ListEmptyComponent={<Text>No Messages</Text>}
          data={calls}
          renderItem={({item}) => <CallItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

//make this component available to the app
export default Calls;
