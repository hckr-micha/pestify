import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '../../lib/theme';

const SERVICES: Record<string, {
  name: string; specialty: string; emoji: string;
  phone: string; location: string; price: string;
}> = {
  s1: { name: 'BugBusters Sorsogon', specialty: 'General Pest Control', emoji: '🏢', phone: '639171234567', location: 'Sorsogon City', price: '₱1,500 – ₱5,000' },
  s2: { name: 'GreenShield Pest Services', specialty: 'Eco-Friendly Treatment', emoji: '🌿', phone: '639189876543', location: 'Bulan, Sorsogon', price: '₱2,000 – ₱8,000' },
  s3: { name: 'AgriGuard Philippines', specialty: 'Farm & Agricultural Pests', emoji: '🌾', phone: '639205551234', location: 'Irosin, Sorsogon', price: '₱3,000 – ₱12,000' },
  s4: { name: 'SafeHome Pest Control', specialty: 'Residential Specialist', emoji: '🏠', phone: '639334445678', location: 'Sorsogon City', price: '₱1,200 – ₱4,500' },
  s5: { name: 'TermiShield Pro', specialty: 'Termite Specialist', emoji: '🛡️', phone: '639457896321', location: 'Legazpi City (covers Sorsogon)', price: '₱5,000 – ₱25,000' },
};

export default function BookService() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = SERVICES[id as string];

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 40, color: colors.textMuted }}>
          Service not found.
        </Text>
      </SafeAreaView>
    );
  }

  function openWhatsApp() {
    const msg = encodeURIComponent(
      `Hello ${service.name}! I found you on Pestify.\n\n` +
      `I would like to book a pest control service.\n` +
      `Please let me know your availability and confirm pricing. Thank you!`
    );
    Linking.openURL(`https://wa.me/${service.phone}?text=${msg}`)
      .catch(() => Linking.openURL(`https://wa.me/${service.phone}`));
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Provider card */}
        <View style={styles.providerCard}>
          <Text style={styles.providerEmoji}>{service.emoji}</Text>
          <Text style={styles.providerName}>{service.name}</Text>
          <Text style={styles.providerSpecialty}>{service.specialty}</Text>
          <Text style={styles.providerLocation}>📍 {service.location}</Text>
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Estimated price</Text>
            <Text style={styles.infoValue}>{service.price}</Text>
          </View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: colors.bgCardBorder }]}>
            <Text style={styles.infoLabel}>Booking method</Text>
            <Text style={styles.infoValue}>WhatsApp</Text>
          </View>
        </View>

        <Text style={styles.note}>
          Tapping the button below will open WhatsApp with a pre-filled message to this provider. Pricing is confirmed directly with the provider.
        </Text>

        {/* WhatsApp CTA */}
        <TouchableOpacity style={styles.whatsappBtn} onPress={openWhatsApp} activeOpacity={0.8}>
          <Text style={styles.whatsappText}>💬 Open WhatsApp to Book</Text>
        </TouchableOpacity>

        {/* Back to services */}
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => router.push('/(tabs)/services')}
        >
          <Text style={styles.secondaryText}>View Other Services</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  backBtn: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  backText: { fontSize: 17, color: colors.primary, fontWeight: '600' },
  content: { flex: 1, padding: 20 },
  providerCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    marginBottom: 16,
  },
  providerEmoji: { fontSize: 52, marginBottom: 12 },
  providerName: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, textAlign: 'center' },
  providerSpecialty: { fontSize: 13, color: colors.primary, fontWeight: '600', marginTop: 4 },
  providerLocation: { fontSize: 13, color: colors.textMuted, marginTop: 6 },
  infoCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    marginBottom: 16,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  infoLabel: { fontSize: 13, color: colors.textMuted },
  infoValue: { fontSize: 13, fontWeight: '700', color: colors.textPrimary },
  note: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  whatsappBtn: {
    backgroundColor: '#25d366',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  whatsappText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  secondaryBtn: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  secondaryText: { color: colors.textSecondary, fontWeight: '600', fontSize: 14 },
});
