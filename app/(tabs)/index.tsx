import { ScrollView, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { router } from 'expo-router';
import { auth } from '../../lib/firebase';
import { colors } from '../../lib/theme';
import pests from '../../data/pests.json';

const QUICK_PESTS = pests.filter(p => p.severity === 'high').slice(0, 4);

const TIPS = [
  { emoji: '🗑️', tip: 'Empty garbage bins daily to prevent cockroach and fly breeding.' },
  { emoji: '💧', tip: 'Check for stagnant water every week — dengue mosquitoes breed in just 7 days.' },
  { emoji: '🌾', tip: 'Store rice in airtight containers to prevent rice weevil infestation.' },
  { emoji: '🪟', tip: 'Keep window screens in good repair to block flying insects.' },
];

export default function Home() {
  const user = auth.currentUser;
  const firstName = user?.email?.split('@')[0] ?? 'User';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
            <Text style={styles.subtitle}>What pest concern do you have today?</Text>
          </View>
        <Image
        source={require('../../assets/logo.png')}
          style={styles.logoMarkImg}
        resizeMode="contain"
      />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerAccent} />
          <Text style={styles.bannerTitle}>🇵🇭 Pestify Solutions</Text>
          <Text style={styles.bannerText}>
            Identify, prevent, and manage common pests across the Philippines.
          </Text>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() => router.push('/(tabs)/pest-guide')}
          >
            <Text style={styles.bannerBtnText}>Browse Pest Guide →</Text>
          </TouchableOpacity>
        </View>

        {/* High Severity */}
        <Text style={styles.sectionTitle}>⚠️ High Severity Pests</Text>
        <View style={styles.alertGrid}>
          {QUICK_PESTS.map(p => (
            <TouchableOpacity
              key={p.id}
              style={styles.alertCard}
              onPress={() => router.push(`/pest/${p.id}`)}
              activeOpacity={0.7}
            >
              <Text style={styles.alertEmoji}>{p.emoji}</Text>
              <Text style={styles.alertName}>{p.name}</Text>
              <Text style={styles.alertLocal}>{p.localName}</Text>
              <View style={styles.highBadge}>
                <Text style={styles.highBadgeText}>HIGH</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionCard, { borderColor: colors.primaryDim }]}
            onPress={() => router.push('/(tabs)/pest-guide')}
          >
            <Text style={styles.actionEmoji}>🦟</Text>
            <Text style={[styles.actionLabel, { color: colors.primary }]}>Pest Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { borderColor: colors.tealDim }]}
            onPress={() => router.push('/(tabs)/services')}
          >
            <Text style={styles.actionEmoji}>📋</Text>
            <Text style={[styles.actionLabel, { color: colors.teal }]}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { borderColor: colors.orangeDim }]}
            onPress={() => router.push('/(tabs)/profile')}
          >
            <Text style={styles.actionEmoji}>👤</Text>
            <Text style={[styles.actionLabel, { color: colors.orange }]}>Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Prevention Tips */}
        <Text style={styles.sectionTitle}>💡 Prevention Tips</Text>
        <View style={styles.tipsBox}>
          {TIPS.map((t, i) => (
            <View key={i} style={[styles.tipRow, i < TIPS.length - 1 && styles.tipBorder]}>
              <Text style={styles.tipEmoji}>{t.emoji}</Text>
              <Text style={styles.tipText}>{t.tip}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Sorsogon State University — Bulan Campus · BSIT 3-3
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: { fontSize: 22, fontWeight: '800', color: colors.textPrimary },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  logoMark: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.bgCard,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: { fontSize: 24 },
  banner: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primaryDim,
    overflow: 'hidden',
  },
  logoMarkImg: {
  width: 46,
  height: 46,
  },
  bannerAccent: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 3,
    backgroundColor: colors.primary,
  },
  bannerTitle: { fontSize: 16, fontWeight: '800', color: colors.primary, marginBottom: 6 },
  bannerText: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginBottom: 14 },
  bannerBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerBtnText: { color: colors.bg, fontWeight: '800', fontSize: 13 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  alertGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 24,
  },
  alertCard: {
    width: '47%',
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  alertEmoji: { fontSize: 32, marginBottom: 6 },
  alertName: { fontSize: 12, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  alertLocal: { fontSize: 11, color: colors.textMuted, fontStyle: 'italic', marginTop: 2 },
  highBadge: {
    marginTop: 6,
    backgroundColor: '#e8545422',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  highBadgeText: { fontSize: 10, fontWeight: '800', color: colors.high },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  actionCard: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  actionEmoji: { fontSize: 26, marginBottom: 6 },
  actionLabel: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  tipsBox: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    marginBottom: 24,
  },
  tipRow: { flexDirection: 'row', padding: 14, gap: 10, alignItems: 'flex-start' },
  tipBorder: { borderBottomWidth: 1, borderBottomColor: colors.bgCardBorder },
  tipEmoji: { fontSize: 20, marginTop: 1 },
  tipText: { flex: 1, fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  footer: { fontSize: 11, color: colors.textMuted, textAlign: 'center' },
});
