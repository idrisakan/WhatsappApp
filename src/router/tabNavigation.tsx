import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CALLS,
  CAMERA,
  CHATS,
  STATUS,
  SETTİNGS,
  TABNAVIGATOR,
  PHONENUMBER,
  CONTACTS,
} from '../utils/routes';
import Contacts from 'react-native-contacts';
import Status from '../screens/status';
import Calls from '../screens/calls';
import Camera from '../screens/camera';
import Chats from '../screens/chats';
import Settings from '../screens/settings';
import Colors from '../theme/Colors';
import TabIcon from '../components/router/tabIcon';
import {PermissionsAndroid, Pressable, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MyContacts from '../screens/contacts';

const Tab = createBottomTabNavigator();
const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: Colors.GRAY_3,
        },
        tabBarIcon: ({focused, color, size}) => (
          <TabIcon size={size} focused={focused} color={color} route={route} />
        ),
        tabBarActiveTintColor: Colors.BLUE_1,
        tabBarInactiveTintColor: Colors.GRAY_1,
      })}>
      <Tab.Screen name={CONTACTS} component={MyContacts} />
      <Tab.Screen name={CALLS} component={Calls} />
      <Tab.Screen name={STATUS} component={Status} />
      <Tab.Screen
        // options={({navigation}) => ({
        //   headerRight: () => (
        //     <Pressable
        //       style={{
        //         marginHorizontal: 20,
        //       }}
        //       onPress={() => navigation.navigate(CONTACTS)}>
        //       <Feather name="edit" size={25} color={Colors.BLUE_1} />
        //     </Pressable>
        //   ),
        //   headerLeft: () => (
        //     <Pressable
        //       style={{
        //         marginHorizontal: 20,
        //       }}
        //       onPress={() => navigation.navigate(PHONENUMBER)}>
        //       <Text style={{color: Colors.BLUE_1, fontSize: 18}}>Edit</Text>
        //     </Pressable>
        //   ),
        // })}
        name={CHATS}
        component={Chats}
      />
      <Tab.Screen name={SETTİNGS} component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
