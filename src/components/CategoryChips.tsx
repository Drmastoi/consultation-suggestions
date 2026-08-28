import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { CategoryCount } from '../types/consultation';

interface CategoryChipsProps {
  categories: CategoryCount[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

/**
 * Horizontal scrollable row of category filter pills.
 * "All" is always first. Tapping a selected chip deselects it.
 */
export function CategoryChips({
  categories,
  selectedCategory,
  onSelect,
}: CategoryChipsProps) {
  const handlePress = (name: string | null) => {
    // Tap same category to deselect
    onSelect(selectedCategory === name ? null : name);
  };

  const chips: { label: string; value: string | null; count?: number }[] = [
    { label: 'All', value: null },
    ...categories.map((c) => ({
      label: c.name,
      value: c.name,
      count: c.count,
    })),
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {chips.map((chip) => {
        const isSelected =
          chip.value === null
            ? selectedCategory === null
            : selectedCategory === chip.value;

        return (
          <TouchableOpacity
            key={chip.label}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => handlePress(chip.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.chipText, isSelected && styles.chipTextSelected]}
            >
              {chip.label}
              {chip.count !== undefined ? ` (${chip.count})` : ''}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  } as ViewStyle,
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#F0F0F5',
    borderWidth: 1,
    borderColor: '#E0E0E5',
  },
  chipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  chipTextSelected: {
    color: '#FFF',
  },
});
