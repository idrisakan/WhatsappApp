import React from 'react';
import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import defaultStyle from '../../styles/defaultScreenStyle';

const WhatsappStatus: React.FC<Props> = ({onChange, value}) => {
  return (
    <View
      style={[
        defaultStyle.safeArea,
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FF8A8C',
        },
      ]}>
      <StatusBar backgroundColor="#FF8A8C" barStyle={'light-content'} />

      <TextInput
        value={value}
        // onChangeText={value =>onChange(value)}
        onChangeText={onChange}
        style={styles.input}
        placeholder="Hikayeni paylaş"
        autoFocus={true} // Klavyeyi otomatik açar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 24,
    padding: 33,
    color: Colors.WHITE,
  },
});

export default WhatsappStatus;
