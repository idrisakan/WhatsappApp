import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultScreenStyle';
import ProfileCard from '../../components/settings/profileCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/Colors';

const Settings: React.FC = () => {
  const Menu = [
    {
      title: 'Account',
      icon: (
        <MaterialIcons name="manage-accounts" size={25} color={Colors.BLUE_1} />
      ),
    },
    {
      title: 'Notifications',
      icon: (
        <MaterialIcons
          name="notifications-on"
          size={25}
          color={Colors.BLUE_1}
        />
      ),
    },
    {
      title: 'WhatsApp Web/Desktop',
      icon: (
        <MaterialIcons name="desktop-windows" size={25} color={Colors.BLUE_1} />
      ),
    },
  ];
  const Menu2 = [
    {
      title: 'Chat',
      icon: <MaterialIcons name="chat" size={25} color={Colors.BLUE_1} />,
    },
    {
      title: 'Tell Friend',
      icon: <MaterialIcons name="info" size={25} color={Colors.BLUE_1} />,
    },
    {
      title: 'Help',
      icon: <MaterialIcons name="help" size={25} color={Colors.BLUE_1} />,
    },
  ];
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={[defaultStyle.container, {paddingHorizontal: 0}]}>
        <ScrollView>
          <ProfileCard />
          <View
            style={{
              backgroundColor: Colors.WHITE,
              marginTop: 25,
              padding: 10,
            }}>
            {Menu.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                {item.icon}
                <View style={{flex: 1, padding: 5}}>
                  <Text style={{fontSize: 18, fontWeight: '500'}}>
                    {item.title}
                  </Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={25}
                  color={Colors.BLACK}
                />
              </Pressable>
            ))}
          </View>
          <View
            style={{
              backgroundColor: Colors.WHITE,
              marginTop: 25,
              padding: 10,
            }}>
            {Menu2.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                {item.icon}
                <View style={{flex: 1, padding: 5}}>
                  <Text style={{fontSize: 18, fontWeight: '500'}}>
                    {item.title}
                  </Text>
                </View>
                <MaterialIcons
                  name="chevron-right"
                  size={25}
                  color={Colors.BLACK}
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
