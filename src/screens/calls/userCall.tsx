//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Image,
} from 'react-native';
import defaultStyle from '../../styles/defaultScreenStyle';
import Colors from '../../theme/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {convertFullName} from '../../utils/functions';

// create a component
const UserCall: React.FC = ({route, navigation}) => {
  const [calling, setCalling] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const user = route?.params?.user;
  useEffect(() => {
    let interval = null;
    if (!calling) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else if (calling && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [calling, seconds]);

  return (
    <SafeAreaView style={defaultStyle.safeArea}>
      <StatusBar backgroundColor={Colors.BLACK} barStyle={'light-content'} />
      <View style={[defaultStyle.container, , {backgroundColor: Colors.BLACK}]}>
        <View style={{flex: 1}}>
          <Text style={styles.name}>
            {convertFullName(user?.name, user?.surname)}
          </Text>
          {calling ? (
            <Text style={styles.status}>Calling...</Text>
          ) : (
            <Text style={styles.status}>
              {String(minutes).padStart(2, 0)}:{String(seconds).padStart(2, 0)}
            </Text>
          )}
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {user?.profileImage ? (
              <Image
                source={{uri: user?.profileImage}}
                style={{
                  width: 170,
                  height: 170,
                  borderRadius: 100,
                }}
              />
            ) : (
              <FontAwesome6
                name="circle-user"
                size={150}
                color={Colors.GRAY_2}
              />
            )}
          </View>
        </View>
        {calling ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              minHeight: 180,
              alignItems: 'center',
              margin: 5,
              borderRadius: 20,
              padding: 5,
            }}>
            <Pressable
              onPress={() => setCalling(false)}
              style={[styles.button, {backgroundColor: Colors.GREEN_2}]}>
              <FontAwesome6
                name="phone-volume"
                size={20}
                color={Colors.WHITE}
              />
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.button, {backgroundColor: Colors.RED}]}>
              <FontAwesome6 name="phone-slash" size={20} color={Colors.WHITE} />
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'rgba(28,28,28,0.9)',
              flexDirection: 'row',
              justifyContent: 'space-around',
              minHeight: 180,
              alignItems: 'center',
              margin: 5,
              borderRadius: 20,
              padding: 5,
            }}>
            <Pressable style={styles.button}>
              <FontAwesome6 name="volume-high" size={20} color={Colors.WHITE} />
            </Pressable>
            <Pressable style={styles.button}>
              <FontAwesome6 name="video" size={20} color={Colors.WHITE} />
            </Pressable>
            <Pressable style={styles.button}>
              <FontAwesome6
                name="microphone-slash"
                size={20}
                color={Colors.WHITE}
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.button, {backgroundColor: Colors.RED}]}>
              <FontAwesome6 name="phone-slash" size={20} color={Colors.WHITE} />
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: Colors.GRAY_1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: Colors.WHITE,
    fontWeight: 'medium',
    fontSize: 24,
    textAlign: 'center',
  },
  status: {
    color: Colors.GRAY_2,
    fontSize: 18,
    textAlign: 'center',
  },
});

//make this component available to the app
export default UserCall;
