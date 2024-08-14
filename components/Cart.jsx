import React from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';


const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity,0)
    }

    return (
        <View style={styles.cart}>
            <Text style={styles.title}>Cart View</Text>
            {cartItems.length === 0 ? (
                <Text>Your Cart is Empty</Text>
            ) : (
                cartItems.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                        <Image source={{ uri : item.image }} style={styles.image} />  
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                            <TextInput 
                                style={styles.quantity}
                                value={String(item.quantity)}
                                keyboardType="numeric"
                                onChangeText={(value) => {
                                    const newValue = value === '' ? 0 : parseInt(value, 10);
                                    updateQuantity(item.id, isNaN(newValue) ? 0 : newValue);
                                    console.log(newValue);
                                }}
                            />
                            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
                        </View>                   
                    </View>
                ))
            )}
            <Text style={styles.total}>Total: ₹.{calculateTotal()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cart : {
        padding: 10,
        alignItems: 'center',
        margin:20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor:'#000',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.1,
        shadowRadius:5,
        elevation:3
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    info : {
        flex: 1,
        marginLeft: 10,
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    price:{
        fontSize: 16,
        color: '#000'
    },
    quantity: {
        height:30,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        marginVertical: 5,
        textAlign: 'center',
    },
    total:{
        fontSize:20,
        fontWeight: 'bold',
        marginTop: 10,
    }
}) 

export default Cart;
