import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import './config/ReactotronConfig';
import Routes from './routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 30,

    color: '#9157c1',
  },
});
console.tron.log(`It's alive`);

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Routes />
    </>
  );
};

export default App;
