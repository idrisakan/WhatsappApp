//import liraries
import React, { Component, useEffect, useState } from 'react';
import {StyleSheet, PermissionsAndroid, SafeAreaView, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';
import ContactsItem from '../../components/contacts/contactsItem';

// create a component
const MyContacts:React.FC = ({navigation}) => {
    const [contacts,setContacts] = useState([])
    const getContacts = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        })
          .then(res => {
            console.log('Permission: ', res);
            Contacts.getAll()
              .then(contacts => {
                setContacts(contacts);
              })
              .catch(e => {
                console.log(e);
              });
          })
          .catch(error => {
            console.error('Permission error: ', error);
          });
      };
      useEffect(() => {
        getContacts();
      }, [])
    return (
        <SafeAreaView style={styles.container}>
           <FlatList data={contacts} renderItem={({item}) => <ContactsItem item={item}/>}/>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    
    },
});

//make this component available to the app
export default MyContacts;
