import { StyleSheet, Text, View, FlatList, TextInput, StatusBar, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CategoryCard from '../../components/CategoryCard';
import { CATEGORIES } from '../../utils/constants';
import { productsApi } from '../../utils/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  description?: string;
  stock: number;
}

const Categories = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products to calculate counts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search query
  const filteredCategories = CATEGORIES.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate product count for each category
  const getProductCount = (categoryName: string): number => {
    return products.filter(p => p.category === categoryName).length;
  };

  // Handle category press
  const handleCategoryPress = (categoryName: string) => {
    router.push(`/category/${categoryName}`);
  };

  // Render category card
  const renderCategoryCard = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <CategoryCard
      category={item}
      productCount={getProductCount(item.name)}
      onPress={() => handleCategoryPress(item.name)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      
      {/* Header Section */}
      <View className="bg-emerald-600 px-4 py-4 pb-6">
        <Text className="text-white text-2xl font-bold mb-4">
          Browse Categories
        </Text>

        {/* Search Bar */}
        <View className="bg-white rounded-xl px-4 py-3 flex-row items-center">
          <Text className="text-gray-400 mr-2">🔍</Text>
          <TextInput
            style={{ flex: 1, color: '#1F2937' }}
            placeholder="Search categories..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Text 
              className="text-emerald-600 font-semibold"
              onPress={() => setSearchQuery('')}
            >
              Clear
            </Text>
          )}
        </View>
      </View>

      {/* Categories Grid */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#059669" />
          <Text className="text-gray-500 mt-3">Loading categories...</Text>
        </View>
      ) : filteredCategories.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-6xl mb-4">📦</Text>
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            No categories found
          </Text>
          <Text className="text-gray-500 text-center">
            {searchQuery ? 'Try a different search term' : 'No categories available'}
          </Text>
        </View>
      ) : (
        <View className="flex-1 bg-gray-50">
          <FlatList
            data={filteredCategories}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCategoryCard}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View className="mb-3">
                <Text className="text-gray-600 text-sm">
                  {filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'} available
                </Text>
              </View>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});