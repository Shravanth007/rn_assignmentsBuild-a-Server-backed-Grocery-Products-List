import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { productsApi } from '../../utils/api';
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
}

export default function CategoryDetail() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get category details
  const category = CATEGORIES.find(cat => cat.name === name);

  useEffect(() => {
    fetchCategoryProducts();
  }, [name]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getAll({ category: name as string });
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: Product) => {
    dispatch(addToCart({
      id: item._id,
      name: item.name,
      imageUrl: item.imageUrl,
      category: item.category,
      price: item.price,
      quantity: 1,
    }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      
      {/* Header */}
      <View className="bg-emerald-600 px-4 py-4">
        <View className="flex-row items-center mb-3">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-3"
          >
            <Text className="text-white text-2xl">←</Text>
          </TouchableOpacity>
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="text-4xl mr-3">{category?.icon || '📦'}</Text>
              <View>
                <Text className="text-white text-2xl font-bold">{name}</Text>
                <Text className="text-emerald-100 text-sm">
                  {products.length} {products.length === 1 ? 'product' : 'products'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Products List */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <View className="bg-white rounded-full p-4 mb-3">
            <ActivityIndicator size="large" color="#059669" />
          </View>
          <Text className="text-gray-600 font-medium">Loading products...</Text>
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-4xl mb-3">⚠️</Text>
          <Text className="text-red-700 font-bold text-lg">Something went wrong</Text>
          <Text className="text-red-600 text-sm mt-2">{error}</Text>
          <TouchableOpacity 
            onPress={fetchCategoryProducts}
            className="bg-red-600 px-6 py-3 rounded-xl mt-4"
          >
            <Text className="text-white font-bold">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : products.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-6xl mb-4">📦</Text>
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            No products found
          </Text>
          <Text className="text-gray-500 text-center mb-6">
            No products available in this category yet
          </Text>
          <TouchableOpacity 
            onPress={() => router.back()}
            className="bg-emerald-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-bold">Back to Categories</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 bg-gray-50">
          <FlatList 
            data={products} 
            numColumns={2}
            keyExtractor={(item) => item._id}
            columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                className="bg-white rounded-2xl p-3 shadow-sm flex-1 mb-3"
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
                  <View className="flex-row items-center mb-2">
                    <Text className="text-xs text-gray-400">📦 {item.stock} in stock</Text>
                  </View>

                  {/* Price and Add Button */}
                  <View className="flex-row items-center justify-between mt-auto">
                    <View>
                      <Text className="text-lg font-bold text-gray-900">
                        ₹{item.price}
                      </Text>
                      <Text className="text-xs text-gray-400 line-through">
                        ₹{(item.price * 1.2).toFixed(0)}
                      </Text>
                    </View>
                    <TouchableOpacity 
                      className="bg-emerald-600 px-4 py-2.5 rounded-xl active:bg-emerald-700" 
                      onPress={() => handleAddToCart(item)}
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
        </View>
      )}
    </SafeAreaView>
  );
}
