//import liraries
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import defaultStyle from '../../styles/defaultScreenStyle';

// create a component
const Status:React.FC = () => {
    return (
        <SafeAreaView style={defaultStyle.safeArea}>
           <View style={defaultStyle.container}>
           <Text>Status</Text>
           </View>
        </SafeAreaView>
    );
};



//make this component available to the app
export default Status;
