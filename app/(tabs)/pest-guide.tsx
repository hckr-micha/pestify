import { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, TextInput, SafeAreaView
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '../../lib/theme';
import pests from '../../data/pests.json';

const CATEGORIES = ['All', 'Home', 'Health', 'Farm', 'Garden', 'Storage'];

const SEVERITY_COLOR: Record<string, string> = {
  high: colors.high,
  medium: colors.medium,
  low: colors.low,
};

export default function PestGuide() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = pests.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.localName.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pest Guide</Text>
        <Text style={styles.subtitle}>Identify and manage common pests</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search pest name or local name..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryChip, activeCategory === item && styles.categoryChipActive]}
              onPress={() => setActiveCategory(item)}
            >
              <Text style={[styles.categoryText, activeCategory === item && styles.categoryTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No pests found for "{search}"</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/pest/${item.id}`)}
            activeOpacity={0.7}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardLocal}>{item.localName}</Text>
              <Text style={styles.cardTagline}>{item.tagline}</Text>
            </View>
            <View style={styles.cardRight}>
              <View style={[styles.severityBadge, { backgroundColor: SEVERITY_COLOR[item.severity] + '22' }]}>
                <Text style={[styles.severityText, { color: SEVERITY_COLOR[item.severity] }]}>
                  {item.severity}
                </Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  title: { fontSize: 28, fontWeight: '800', color: colors.textPrimary },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginTop: 2 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 11, fontSize: 14, color: colors.textPrimary },
  categoryList: { paddingHorizontal: 20, paddingBottom: 12, gap: 8 },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    marginRight: 8,
  },
  categoryChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryText: { fontSize: 13, color: colors.textSecondary, fontWeight: '600' },
  categoryTextActive: { color: colors.bg },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 10 },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  cardEmoji: { fontSize: 36, marginRight: 12 },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  cardLocal: { fontSize: 12, color: colors.textMuted, fontStyle: 'italic', marginTop: 1 },
  cardTagline: { fontSize: 12, color: colors.textSecondary, marginTop: 3 },
  cardRight: { alignItems: 'center', gap: 6 },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  severityText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  arrow: { fontSize: 20, color: colors.textMuted },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 40, fontSize: 14 },
});
