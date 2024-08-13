import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProductsList = ({ products, addToCart }) => {
    return (
        <View style={styles.productList}>
            {products.map((product) => (
                <View key={product.id} style={styles.productCard}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.price}>₹.{product.price}</Text>
                    <Button title="Add to Cart" onPress={() => addToCart(product)} />
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    productList:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around'
    }, 
    productCard: {
        width:'45%',
        marginVertical: 10,
        padding:10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor:'#000',
        shadowOffset:{width:0, height:2},
        shadowOpacity:0.1,
        shadowRadius:5,
        elevation:3
    },
    image:{
        width:'100%',
        height:150,
        borderRadius:10
    },
    name:{
        fontSize:16,
        fontWeight:'bold',
        marginVertical:5
    },
    description:{
        fontSize:14,
        color:"#666"
    },
    price:{
        fontSize:18,
        color:"#000",
        marginVertical:5
    }
})

export default ProductsList;