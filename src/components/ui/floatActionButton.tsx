//import liraries
import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {FloatActionButtonProps} from '../../models/ui/floatActionButton';
import Colors from '../../theme/Colors';

// create a component
const FloatActionButton: React.FC<FloatActionButtonProps> = ({
  icon,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75,
    backgroundColor: Colors.GREEN_2,
    borderRadius: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android için gölge
    zIndex: 10,   // Üstte yer alması için
  },
});

export default FloatActionButton;
