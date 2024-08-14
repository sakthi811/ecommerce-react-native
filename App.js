<script src="http://localhost:8097"></script>
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import productsData from './products.json';

export default function App() {

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const addToCart = (product) => {
    console.log(product);
    const existingItem = cartItems.find((item) => item.id === product.id);
    if(existingItem) {
      setCartItems(
        cartItems.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity : 1}]);
    }
  }

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) => 
        item.id === id ? {...item, quantity: quantity} : item
      )
    )
  }

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter((item) => item.id != id)
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>E-commerce Shopping App</Text>
      <ProductsList products={products} addToCart={addToCart} />
      <Cart cartItems={ cartItems } updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
