import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'

const cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? (subtotal > 500 ? 0 : 40) : 0;
  const total = subtotal + deliveryFee;

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id: string, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="light-content" backgroundColor="#059669" />
        <View className="bg-emerald-600 px-4 py-4">
          <Text className="text-white text-2xl font-bold">Cart</Text>
        </View>
        
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-7xl mb-4">🛒</Text>
          <Text className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</Text>
          <Text className="text-gray-500 text-center mb-6">
            Looks like you haven't added anything to your cart yet
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      <View className="flex-1">
        {/* Header */}
        <View className="bg-emerald-600 px-4 py-4 shadow-sm">
          <Text className="text-white text-2xl font-bold">My Cart</Text>
          <Text className="text-emerald-100 text-sm mt-1">{cartItems.length} item(s) • ₹{subtotal.toFixed(2)}</Text>
        </View>

        {/* Cart Items */}
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View className="bg-white mx-4 mt-3 rounded-2xl p-4 shadow-sm">
              <View className="flex-row items-center">
                {/* Product Image */}
                <View className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden mr-4">
                  <Image 
                    source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                  />
                </View>
                
                {/* Product Info */}
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-900 mb-1">{item.name}</Text>
                  <Text className="text-sm text-emerald-600 font-semibold mb-2">{item.category}</Text>
                  <Text className="text-lg font-bold text-gray-900">₹{item.price}</Text>
                </View>

                {/* Actions */}
                <View className="items-end">
                  <TouchableOpacity
                    onPress={() => handleRemove(item.id)}
                    className="mb-3 bg-red-50 px-3 py-1 rounded-lg"
                    activeOpacity={0.7}
                  >
                    <Text className="text-red-600 text-xs font-bold">🗑️ Remove</Text>
                  </TouchableOpacity>
                  
                  {/* Quantity Controls */}
                  <View className="flex-row items-center bg-emerald-50 rounded-xl overflow-hidden">
                    <TouchableOpacity
                      onPress={() => handleDecrement(item.id, item.quantity)}
                      className="px-3 py-2 bg-white"
                      activeOpacity={0.7}
                    >
                      <Text className="text-emerald-600 font-bold text-lg">−</Text>
                    </TouchableOpacity>
                    
                    <View className="px-4 py-2 bg-emerald-600">
                      <Text className="text-white font-bold text-base">{item.quantity}</Text>
                    </View>
                    
                    <TouchableOpacity
                      onPress={() => handleIncrement(item.id, item.quantity)}
                      className="px-3 py-2 bg-white"
                      activeOpacity={0.7}
                    >
                      <Text className="text-emerald-600 font-bold text-lg">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              {/* Item Total */}
              <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between">
                <Text className="text-gray-600 font-medium">Item Total</Text>
                <Text className="text-gray-900 font-bold">₹{(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            </View>
          )}
        />

        {/* Bill Summary */}
        <View className="bg-white border-t border-gray-200 px-4 py-5 shadow-lg">
          {/* Price Breakdown */}
          <View className="mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="text-gray-900 font-semibold">₹{subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Delivery Fee</Text>
              {deliveryFee === 0 ? (
                <Text className="text-emerald-600 font-semibold">FREE 🎉</Text>
              ) : (
                <Text className="text-gray-900 font-semibold">₹{deliveryFee}</Text>
              )}
            </View>
            {subtotal < 500 && subtotal > 0 && (
              <Text className="text-xs text-emerald-600 mt-1">Add ₹{(500 - subtotal).toFixed(0)} more for FREE delivery!</Text>
            )}
            <View className="h-px bg-gray-200 my-3" />
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-900">Total</Text>
              <Text className="text-2xl font-bold text-emerald-600">₹{total.toFixed(2)}</Text>
            </View>
          </View>
          
          {/* Checkout Button */}
          <TouchableOpacity 
            className="bg-emerald-600 rounded-2xl py-4 items-center shadow-md active:bg-emerald-700"
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-bold">Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default cart;
    color: "#6B7280",
    marginTop: 10,
  },
});