import { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Linking, SafeAreaView, TextInput
} from 'react-native';
import { colors } from '../../lib/theme';

const SERVICES = [
  {
    id: 's1',
    name: 'BugBusters Sorsogon',
    specialty: 'General Pest Control',
    emoji: '🏢',
    rating: 4.8,
    reviews: 124,
    location: 'Sorsogon City',
    phone: '639171234567',
    services: ['Cockroach', 'Rat', 'Termite', 'Mosquito'],
    price: '₱1,500 – ₱5,000',
    responseTime: 'Same day',
  },
  {
    id: 's2',
    name: 'GreenShield Pest Services',
    specialty: 'Eco-Friendly Treatment',
    emoji: '🌿',
    rating: 4.6,
    reviews: 87,
    location: 'Bulan, Sorsogon',
    phone: '639189876543',
    services: ['Termite', 'Bed Bug', 'Garden Pests'],
    price: '₱2,000 – ₱8,000',
    responseTime: '24 hours',
  },
  {
    id: 's3',
    name: 'AgriGuard Philippines',
    specialty: 'Farm & Agricultural Pests',
    emoji: '🌾',
    rating: 4.7,
    reviews: 56,
    location: 'Irosin, Sorsogon',
    phone: '639205551234',
    services: ['Brown Planthopper', 'Mole Cricket', 'Aphid', 'Rice Weevil'],
    price: '₱3,000 – ₱12,000',
    responseTime: '48 hours',
  },
  {
    id: 's4',
    name: 'SafeHome Pest Control',
    specialty: 'Residential Specialist',
    emoji: '🏠',
    rating: 4.5,
    reviews: 203,
    location: 'Sorsogon City',
    phone: '639334445678',
    services: ['Cockroach', 'Rat', 'Bed Bug', 'House Fly'],
    price: '₱1,200 – ₱4,500',
    responseTime: 'Same day',
  },
  {
    id: 's5',
    name: 'TermiShield Pro',
    specialty: 'Termite Specialist',
    emoji: '🛡️',
    rating: 4.9,
    reviews: 312,
    location: 'Legazpi City (covers Sorsogon)',
    phone: '639457896321',
    services: ['Termite', 'Wood Borer', 'Ant'],
    price: '₱5,000 – ₱25,000',
    responseTime: '24–48 hours',
  },
];

function buildWhatsAppMessage(service: typeof SERVICES[0], pest: string) {
  return encodeURIComponent(
    `Hello! I found your service on Pestify.\n\n` +
    `I would like to inquire about pest control services.\n` +
    `Pest concern: ${pest || 'General inquiry'}\n` +
    `Service needed: ${service.specialty}\n\n` +
    `Please let me know your availability. Thank you!`
  );
}

export default function Services() {
  const [search, setSearch] = useState('');

  const filtered = SERVICES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.specialty.toLowerCase().includes(search.toLowerCase()) ||
    s.services.some(sv => sv.toLowerCase().includes(search.toLowerCase())) ||
    s.location.toLowerCase().includes(search.toLowerCase())
  );

  function openWhatsApp(service: typeof SERVICES[0]) {
    const msg = buildWhatsAppMessage(service, search);
    const url = `https://wa.me/${service.phone}?text=${msg}`;
    Linking.openURL(url).catch(() => Linking.openURL(`https://wa.me/${service.phone}`));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pest Control Services</Text>
        <Text style={styles.subtitle}>Licensed providers in Sorsogon</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by pest, service, or location..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No services found.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
              <View style={styles.cardTitleBlock}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardSpecialty}>{item.specialty}</Text>
                <Text style={styles.cardLocation}>📍 {item.location}</Text>
              </View>
              <View style={styles.ratingBlock}>
                <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                <Text style={styles.reviewText}>{item.reviews} reviews</Text>
              </View>
            </View>

            <View style={styles.tags}>
              {item.services.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.priceLabel}>Starting price</Text>
                <Text style={styles.priceValue}>{item.price}</Text>
              </View>
              <View style={styles.responseBlock}>
                <Text style={styles.responseLabel}>Response</Text>
                <Text style={styles.responseValue}>{item.responseTime}</Text>
              </View>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() => openWhatsApp(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.bookText}>💬 Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: colors.textPrimary },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 11, fontSize: 14, color: colors.textPrimary },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 40, fontSize: 14 },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  cardHeader: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  cardEmoji: { fontSize: 32, marginTop: 2 },
  cardTitleBlock: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  cardSpecialty: { fontSize: 12, color: colors.primary, fontWeight: '600', marginTop: 1 },
  cardLocation: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  ratingBlock: { alignItems: 'flex-end' },
  ratingText: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  reviewText: { fontSize: 11, color: colors.textMuted, marginTop: 2 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  tag: {
    backgroundColor: colors.primaryGlow,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagText: { fontSize: 11, color: colors.primary, fontWeight: '600' },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.bgCardBorder,
    paddingTop: 12,
    gap: 8,
  },
  priceLabel: { fontSize: 10, color: colors.textMuted, textTransform: 'uppercase', fontWeight: '600' },
  priceValue: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  responseBlock: { flex: 1, alignItems: 'center' },
  responseLabel: { fontSize: 10, color: colors.textMuted, textTransform: 'uppercase', fontWeight: '600' },
  responseValue: { fontSize: 12, fontWeight: '600', color: colors.textPrimary },
  bookBtn: { backgroundColor: '#25d366', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 10 },
  bookText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
