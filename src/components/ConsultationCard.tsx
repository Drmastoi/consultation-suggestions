import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { ConsultationEntry } from '../types/consultation';

interface ConsultationCardProps {
  entry: ConsultationEntry;
  onPress: (entry: ConsultationEntry) => void;
}

/**
 * A single list item showing the disease name and category.
 * Tap to open the detail view.
 */
export function ConsultationCard({ entry, onPress }: ConsultationCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(entry)}
      activeOpacity={0.65}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📋</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {entry.title || entry.disease_name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {entry.category}
        </Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8ED',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
    lineHeight: 20,
  },
  category: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
    marginTop: 3,
  },
  chevron: {
    fontSize: 22,
    color: '#C4C4CC',
    marginLeft: 8,
    fontWeight: '300',
  },
});
