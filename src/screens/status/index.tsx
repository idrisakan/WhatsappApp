import React from 'react';
import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import defaultStyle from '../../styles/defaultScreenStyle';
import ProfileCard from '../../components/settings/profileCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/Colors';
import StatusCard from '../../components/status/statusCard';

const Status: React.FC = () => {
  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <View style={[defaultStyle.container, {paddingHorizontal: 0}]}>
        <ScrollView>
          <StatusCard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Status;
