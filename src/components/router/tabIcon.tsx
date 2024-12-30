//import liraries
import React from 'react';
import {Image} from 'react-native';
import {TabIconProps} from '../../models/ui/tabIconProps';
import {CALLS, CAMERA, CHATS, CONTACTS, SETTİNGS, STATUS} from '../../utils/routes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const TabIcon: React.FC<TabIconProps> = ({size, route,color}) => {
  switch (route?.name) {
    case STATUS:
      return (
        <Ionicons name="disc-outline" size={size} color={color} />
      );
    case CALLS:
      return (
        <Ionicons name="call-outline" size={size} color={color} />
      );
    case CONTACTS:
      return (
        <AntDesign name="contacts" size={size} color={color} />

      );
    case CHATS:
      return (
        <Ionicons name="chatbubbles-outline" size={size} color={color} />
      );
    case SETTİNGS:
      return (
        <Ionicons name="settings-outline" size={size} color={color} />
      );

    default:
      <Image
        source={require('../../assets/icons/statusOutline.png')}
        style={{
          width: size,
          height: size,
          resizeMode: 'contain',
        }}
      />;
  }
};

export default TabIcon;
