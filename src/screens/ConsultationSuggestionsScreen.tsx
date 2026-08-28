import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
} from 'react-native';
import {
  searchAndFilter,
  getCategories,
} from '../data/consultationLoader';
import { ConsultationEntry } from '../types/consultation';
import { CategoryChips } from '../components/CategoryChips';
import { ConsultationCard } from '../components/ConsultationCard';

interface ConsultationSuggestionsScreenProps {
  /** Called when user taps an entry — navigate to detail screen */
  onSelectEntry: (entry: ConsultationEntry) => void;
}

/**
 * Main consultation suggestions screen.
 * Provides search bar + category filter chips + results list.
 *
 * Usage:
 *   <ConsultationSuggestionsScreen
 *     onSelectEntry={(entry) => navigation.navigate('ConsultationDetail', { entry })}
 *   />
 */
export function ConsultationSuggestionsScreen({
  onSelectEntry,
}: ConsultationSuggestionsScreenProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => getCategories(), []);

  const results = useMemo(
    () => searchAndFilter(query, selectedCategory),
    [query, selectedCategory]
  );

  const renderItem: ListRenderItem<ConsultationEntry> = useCallback(
    ({ item }) => (
      <ConsultationCard entry={item} onPress={onSelectEntry} />
    ),
    [onSelectEntry]
  );

  const keyExtractor = useCallback(
    (item: ConsultationEntry) => item.disease_name,
    []
  );

  const ListHeader = useMemo(
    () => (
      <>
        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <Text style={styles.resultCount}>
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </Text>
      </>
    ),
    [categories, selectedCategory, results.length]
  );

  const ListEmpty = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>No results found</Text>
        <Text style={styles.emptySubtitle}>
          Try a different search term or category
        </Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Consultation Suggestions</Text>
          <Text style={styles.headerSubtitle}>
            Search conditions, view templates, copy to clipboard
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search conditions, symptoms, tests..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Text
              style={styles.clearButton}
              onPress={() => setQuery('')}
            >
              ✕
            </Text>
          )}
        </View>

        {/* Results */}
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E5',
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
    paddingVertical: 0,
  },
  clearButton: {
    fontSize: 16,
    color: '#9CA3AF',
    paddingLeft: 8,
    paddingVertical: 4,
  },
  resultCount: {
    fontSize: 12,
    color: '#9CA3AF',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
