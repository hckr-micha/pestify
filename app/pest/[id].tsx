import { ScrollView, View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors } from '../../lib/theme';
import pests from '../../data/pests.json';

const SEVERITY_COLOR: Record<string, string> = {
  high: colors.high,
  medium: colors.medium,
  low: colors.low,
};

export default function PestDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pest = pests.find(p => p.id === id);

  if (!pest) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 40, color: colors.textMuted }}>
          Pest not found.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>{pest.emoji}</Text>
          <Text style={styles.heroName}>{pest.name}</Text>
          <Text style={styles.heroLocal}>{pest.localName}</Text>
          <View style={[styles.severityBadge, { backgroundColor: SEVERITY_COLOR[pest.severity] + '22' }]}>
            <Text style={[styles.severityText, { color: SEVERITY_COLOR[pest.severity] }]}>
              {pest.severity.toUpperCase()} SEVERITY
            </Text>
          </View>
        </View>

        {/* Meta pills */}
        <View style={styles.pills}>
          <View style={styles.pill}>
            <Text style={styles.pillLabel}>Category</Text>
            <Text style={styles.pillValue}>{pest.category}</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillLabel}>Season</Text>
            <Text style={styles.pillValue}>{pest.season}</Text>
          </View>
        </View>

        <Section title="About">
          <Text style={styles.bodyText}>{pest.description}</Text>
        </Section>

        <View style={styles.dangerBox}>
          <Text style={styles.dangerIcon}>⚠️</Text>
          <Text style={styles.dangerText}>{pest.dangerLevel}</Text>
        </View>

        <Section title="Signs of Infestation">
          {pest.signs.map((sign, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.high }]}>•</Text>
              <Text style={styles.bulletText}>{sign}</Text>
            </View>
          ))}
        </Section>

        <Section title="Prevention Tips">
          {pest.prevention.map((tip, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={[styles.bullet, { color: colors.primary }]}>✓</Text>
              <Text style={styles.bulletText}>{tip}</Text>
            </View>
          ))}
        </Section>

        <Section title="Treatment">
          <Text style={styles.bodyText}>{pest.treatment}</Text>
        </Section>

        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => router.push('/services')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaText}>📋 Find a Pest Control Service</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  backBtn: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
  backText: { fontSize: 17, color: colors.primary, fontWeight: '600' },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  hero: { alignItems: 'center', paddingVertical: 24 },
  heroEmoji: { fontSize: 72, marginBottom: 10 },
  heroName: { fontSize: 26, fontWeight: '800', color: colors.textPrimary, textAlign: 'center' },
  heroLocal: { fontSize: 16, color: colors.textMuted, fontStyle: 'italic', marginTop: 4, marginBottom: 12 },
  severityBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  severityText: { fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  pills: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  pill: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  pillLabel: { fontSize: 11, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase', marginBottom: 2 },
  pillValue: { fontSize: 13, color: colors.textPrimary, fontWeight: '600' },
  section: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: colors.primary, marginBottom: 10 },
  bodyText: { fontSize: 14, color: colors.textSecondary, lineHeight: 21 },
  bulletRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  bullet: { fontSize: 14, fontWeight: '700', marginTop: 1 },
  bulletText: { flex: 1, fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  dangerBox: {
    flexDirection: 'row',
    backgroundColor: '#e8543322',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8543344',
    gap: 10,
    alignItems: 'flex-start',
  },
  dangerIcon: { fontSize: 18 },
  dangerText: { flex: 1, fontSize: 13, color: colors.orange, lineHeight: 19, fontWeight: '500' },
  ctaBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaText: { color: colors.bg, fontSize: 15, fontWeight: '800' },
});
