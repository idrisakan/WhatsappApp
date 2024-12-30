//import liraries
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import RootNavigation from './src/router/rootNavigation';
import {Provider} from 'react-redux';
import { store } from './src/store';
LogBox.ignoreAllLogs();
// create a component
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
