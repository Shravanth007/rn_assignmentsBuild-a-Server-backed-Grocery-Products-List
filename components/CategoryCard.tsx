import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    icon: string;
    color: string;
    bgColor: string;
  };
  productCount: number;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, productCount, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.card, { backgroundColor: category.bgColor }]}
      className="rounded-2xl p-4 mb-4 shadow-sm"
    >
      {/* Category Icon */}
      <View className="mb-3">
        <Text style={styles.icon}>{category.icon}</Text>
      </View>

      {/* Category Name */}
      <Text className="text-lg font-bold text-gray-900 mb-1">
        {category.name}
      </Text>

      {/* Product Count */}
      <Text className="text-sm text-gray-600">
        {productCount} {productCount === 1 ? 'product' : 'products'}
      </Text>

      {/* Visual Indicator Arrow */}
      <View className="absolute top-3 right-3">
        <Text className="text-gray-400 text-xs">→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 140,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 40,
  },
});

export default CategoryCard;
