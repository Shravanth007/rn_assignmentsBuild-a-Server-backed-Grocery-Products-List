import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, StatusBar, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationPicker from "../../components/LocationPicker";
import { productsApi } from "../../utils/api";
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { CATEGORIES } from '../../utils/constants';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  description?: string;
  stock: number;
  createdAt?: string;
}

const Home = () => {
  const router = useRouter();
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);
  const [locationName, setLocationName] = useState("Home");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //intilize dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    loadSavedLocation();
    fetchProducts();
  }, []);

  const loadSavedLocation = async () => {
    try {
      const saved = await AsyncStorage.getItem("userLocation");
      if (saved) {
        const location = JSON.parse(saved);
        setLocationName(location.address || "Home");
      }
    } catch (error) {
      console.error("Error loading location:", error);
    }
  };

  const handleLocationSelect = async (location: {
    latitude: number;
    longitude: number;
    address?: string;
  }) => {
    console.log("handleLocationSelect called with:", location);
    const newLocationName = location.address || "Home";
    console.log("Setting location name to:", newLocationName);
    setLocationName(newLocationName);
    try {
      await AsyncStorage.setItem("userLocation", JSON.stringify(location));
      console.log("Location saved to AsyncStorage");
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getAll();
      setProducts(data);
      console.log('✅ Fetched products:', data.length);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      <ScrollView className='flex-1'>
        <View className='bg-emerald-600 px-4 pt-2 pb-4'>
          {/* Header with location */}
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1">
              <Text className="text-white text-xs opacity-90">Delivery to</Text>
              <View className='flex-row items-center'>
                <Text className='text-white text-base font-bold mr-1'>{locationName} ▼</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setLocationPickerVisible(true)}
            >
              <Text className="text-white text-xl font-semibold">
                📍 Change
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-white rounded-xl px-4 py-3 flex-row items-center">
            <Text className="text-gray-400 mr-2">🔍</Text>
            <TextInput
              style={{ flex: 1, color: '#1F2937' }}
              placeholder="Search for products..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* {Delivery Banner} */}
        <View className="bg-emerald-50 px-4 py-3 flex-row items-center justify-between border-b border-emerald-100">
          <View className="flex-row items-center">
            <Text className="text-2xl mr-2">⚡</Text>
            <View>
              <Text className="text-emerald-800 font-bold text-sm">
                Delivery in 10-15 mins
              </Text>
              <Text className="text-emerald-600 text-xs">
                Express delivery available
              </Text>
            </View>
          </View>

          <TouchableOpacity>
            <Text className="text-emerald-600 font-semibold text-xs">
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}

        <View className='px-4 py-4 bg-white'>
          <Text className='text-base font-semibold text-gray-800 mb-3'>Shop by Category</Text>
          <FlatList data={CATEGORIES} horizontal
            renderItem={({ item }) => (
              <View className="items-center mr-4">
                <View
                  className={`w-16 h-16 rounded-full ${item.color} items-center justify-center mb-2`}
                >
                  <Text className="text-3xl">{item.icon}</Text>
                </View>
                <Text className="text-xs font-medium text-gray-700">
                  {item.name}
                </Text>
              </View>
            )} showsHorizontalScrollIndicator={false} />
        </View>


        {/* Products Grid */}
        <View className="px-4 py-4 bg-gray-50 flex-1">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Fresh Picks</Text>
            <TouchableOpacity>
              <Text className="text-emerald-600 font-semibold text-sm">See All →</Text>
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <View className="flex-1 items-center justify-center py-12">
              <View className="bg-white rounded-full p-4 mb-3">
                <ActivityIndicator size="large" color="#059669" />
              </View>
              <Text className="text-gray-600 font-medium">Loading fresh products...</Text>
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center py-12 bg-red-50 rounded-2xl mx-4">
              <Text className="text-4xl mb-3">⚠️</Text>
              <Text className="text-red-700 font-bold text-lg">Oops! Something went wrong</Text>
              <Text className="text-red-600 text-sm mt-2 px-4 text-center">{error}</Text>
              <TouchableOpacity 
                onPress={fetchProducts}
                className="bg-red-600 px-6 py-3 rounded-xl mt-4"
              >
                <Text className="text-white font-bold">Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : products.length === 0 ? (
            <View className="flex-1 items-center justify-center py-12">
              <Text className="text-6xl mb-4">📦</Text>
              <Text className="text-gray-600 font-semibold">No products available</Text>
              <Text className="text-gray-400 text-sm mt-1">Check back soon!</Text>
            </View>
          ) : (
            <FlatList 
              data={products} 
              numColumns={2}
              keyExtractor={(item) => item._id}
              columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  className="bg-white rounded-2xl p-3 shadow-sm flex-1"
                  style={{ maxWidth: '48%' }}
                >
                  {/* Product Image */}
                  <View className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3 relative">
                    <Image 
                      source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                    {item.stock < 20 && (
                      <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full">
                        <Text className="text-white text-xs font-bold">Low Stock</Text>
                      </View>
                    )}
                  </View>

                  {/* Product Info */}
                  <View className="flex-1">
                    <Text
                      className="text-base font-bold text-gray-900 mb-1"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    <Text className="text-xs text-emerald-600 font-semibold mb-1">{item.category}</Text>
                    <View className="flex-row items-center mb-2">
                      <Text className="text-xs text-gray-400">📦 {item.stock} in stock</Text>
                    </View>

                    {/* Price and Add Button */}
                    <View className="flex-row items-center justify-between mt-auto">
                      <View>
                        <Text className="text-lg font-bold text-gray-900">
                          ₹{item.price}
                        </Text>
                        <Text className="text-xs text-gray-400 line-through">₹{(item.price * 1.2).toFixed(0)}</Text>
                      </View>
                      <TouchableOpacity 
                        className="bg-emerald-600 px-4 py-2.5 rounded-xl active:bg-emerald-700" 
                        onPress={() => {
                          dispatch(addToCart({
                            id: item._id,
                            name: item.name,
                            imageUrl: item.imageUrl,
                            category: item.category,
                            price: item.price,
                            quantity: 1,
                          }))
                        }}
                        activeOpacity={0.8}
                      >
                        <Text className="text-white text-sm font-bold">
                          Add +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )} 
            />
          )}
        </View>
      </ScrollView>

      {/* Location Picker Modal */}
      <LocationPicker 
        visible={locationPickerVisible}
        onClose={() => setLocationPickerVisible(false)}
        onLocationSelect={handleLocationSelect}
      />
    </SafeAreaView> 
  );
};

export default Home;

const styles = StyleSheet.create({})