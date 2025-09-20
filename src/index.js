import React from 'react';
import { LogBox, Text } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './AppNavigator';
import store from './redux/store/store';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
