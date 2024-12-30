//import liraries
import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import Colors from '../../theme/Colors';
import { InputProps } from '../../models/ui/input';

const Input: React.FC<InputProps> = ({onChange, value, placeholder,editable=true}) => {
 
  return (
    <View style={styles.container}>
      <Text style={{fontSize:16,color:Colors.BLACK}}>{placeholder}</Text>
      <TextInput
      editable={editable}
        value={value}
        onChangeText={value => onChange(value)}
        style={styles.input}
        placeholder={placeholder}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {padding: 10},
  input: {
    backgroundColor: Colors.GRAY_3,
    color:'black',
    fontSize: 24,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth:0.5,
    borderColor: Colors.GRAY_2,
  
  },

});

export default Input;
