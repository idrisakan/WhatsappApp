import React, { useState } from 'react';
import {View, StyleSheet, SafeAreaView, Image, Pressable} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Input from '../../components/ui/Input';
import FloatActionButton from '../../components/ui/floatActionButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../theme/Colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';

// create a component
const EditProfile: React.FC = ({route}) => {
  const dispatch = useDispatch()
  const [url,setUrl] = useState(user?.profileImage)
  const user = route?.params?.user;

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      });
      return image;
    } catch (error) {
      console.log(error);
    }
  };
  const getImageUrl = async image => {
    if (!image) return;
    const {path, fileName} = image;
 
    const referance = storage().ref(`profilePictures/${user?.phoneNumber}`);
    try {
      await referance.putFile(path)
      const url = await referance.getDownloadURL();
      return url;
    } catch (error) {}
  };
  const uploadImage = async () => {
    const image = await pickImage();
    const imageUrl = await getImageUrl(image);
setUrl(imageUrl)
  };
  const updateUser = async () => {
    firestore()
    .collection('Users')
    .doc(user?.phoneNumber)
    .update({
      profileImage: url,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
      onPress={() => uploadImage()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          padding: 30,
          marginVertical: 20,
        }}>
        {user?.profileImage ? (
          <Image
            source={{uri: user?.profileImage}}
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
            }}
          />
        ) : (
          <FontAwesome6 name="circle-user" size={100} color={Colors.BLUE_1} />
        )}
        <View
          style={{
            position: 'absolute',
            backgroundColor: Colors.GREEN_2,
            bottom: 22,
            right: 25,
            padding: 8,
            borderRadius: 100,
          }}>
          <FontAwesome6 name="camera" size={15} color={Colors.WHITE} />
        </View>
      </Pressable>
      <View style={{flex: 1}}>
        <Input
          editable={false}
          value={user?.phoneNumber}
          placeholder="Phone Number"
          onChange={(value: string) => dispatch(setPhoneNumber(value))}
        />
        <Input
          value={user?.name}
          placeholder="Name"
          onChange={(value: string) => dispatch(setName(value))}
        />
        <Input
          value={user?.surname}
          placeholder="Surname"
          onChange={(value: string) => dispatch(setSurname(value))}
        />
        <Input
          value={user?.status}
          placeholder="Status"
          onChange={(value: string) => dispatch(setSurname(value))}
        />

        <FloatActionButton
          onPress={() => updateUser()}
          icon={<Ionicons name="save" size={35} color={Colors.WHITE} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EditProfile;
