import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CartTestComponent from '../components/CartTestComponent';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-commerce App</Text>
      <CartTestComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default HomeScreen;
