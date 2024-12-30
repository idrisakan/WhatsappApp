import React, {useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import CountryItem from '../../components/auth/countryItem';
import {useSelector} from 'react-redux';

const CountriesCode: React.FC = () => {
  const {countries} = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={countries}
        renderItem={({item}) => <CountryItem item={item} />}
      />
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
export default CountriesCode;
