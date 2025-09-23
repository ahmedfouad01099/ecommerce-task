import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../redux/slices/cartSlice';

const CartTestComponent = () => {
  const cartCount = useSelector(state => state.cart.cartCount);
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: Date.now(),
      name: 'Test Product',
      price: 29.99,
      quantity: 1
    }));
  };

  const handleRemoveFromCart = () => {
    if (cartItems.length > 0) {
      dispatch(removeFromCart({
        id: cartItems[0].id,
        quantity: 1
      }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Test Component</Text>
      <Text style={styles.cartCount}>Cart Count: {cartCount}</Text>
      <Text style={styles.itemsCount}>Items: {cartItems.length}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleRemoveFromCart}>
        <Text style={styles.buttonText}>Remove from Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClearCart}>
        <Text style={styles.buttonText}>Clear Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartCount: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemsCount: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartTestComponent;
