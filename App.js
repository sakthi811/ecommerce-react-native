import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import ProductsList from './components/ProductsList';
import Cart from './components/Cart';
import productsData from './products.json';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const Tab = createBottomTabNavigator();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const addToCart = (product) => {
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
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route}) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if(route.name === 'Products') {
              iconName = 'home-outline';
            } else if(route.name === 'Cart') {
              iconName = 'cart-outline';
            }
            return <Ionicons name ={iconName} size={size} color={color} />
          },
          tabBarBadge: route.name === 'Cart' && cartItems.length > 0 ? cartItems.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#FF6347',
            color: '#fff',
            fontSize: 12,
          }
        })}
      >
        <Tab.Screen name="Products" options={{ title: "Products" }}>
          {() => <ProductsList products={products} addToCart={addToCart} />}
        </Tab.Screen>
        <Tab.Screen name="Cart" options={{ title: "Cart"}} >
          {() => (
            <Cart cartItems={ cartItems } updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
    /* <ScrollView style={styles.container}>
      <Text style={styles.header}>E-commerce Shopping App</Text>
      <ProductsList products={products} addToCart={addToCart} />
      <Cart cartItems={ cartItems } updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>
    </ScrollView> */
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
