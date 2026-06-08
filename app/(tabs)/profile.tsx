import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { colors } from '../../lib/theme';

export default function Profile() {
  const user = auth.currentUser;
  const email = user?.email ?? 'Unknown';
  const displayName = email.split('@')[0];
  const joinDate = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : 'Unknown';

  async function handleLogout() {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await signOut(auth);
          router.replace('/login');
        },
      },
    ]);
  }

  const MENU_ITEMS = [
    { emoji: '🦟', label: 'Pest Guide', onPress: () => router.push('/(tabs)/pest-guide') },
    { emoji: '📋', label: 'Find Services', onPress: () => router.push('/(tabs)/services') },
  ];

  const INFO_ITEMS = [
    { label: 'Email', value: email },
    { label: 'Member since', value: joinDate },
    { label: 'Account type', value: 'Standard User' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{displayName[0]?.toUpperCase() ?? '?'}</Text>
          </View>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{email}</Text>
          <View style={styles.brandTag}>
            <Text style={styles.brandTagText}>🐜 PESTIFY SOLUTIONS</Text>
          </View>
        </View>

        {/* Account Info */}
        <Text style={styles.sectionLabel}>Account Information</Text>
        <View style={styles.infoCard}>
          {INFO_ITEMS.map((item, i) => (
            <View key={item.label} style={[styles.infoRow, i < INFO_ITEMS.length - 1 && styles.infoBorder]}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Quick Navigation */}
        <Text style={styles.sectionLabel}>Navigate</Text>
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuRow, i < MENU_ITEMS.length - 1 && styles.menuBorder]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* About */}
        <Text style={styles.sectionLabel}>About</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>🐜 Pestify Solutions</Text>
          <Text style={styles.aboutText}>
            A mobile-based pest information and service booking app for Filipino households, farmers, and pest control providers in Sorsogon Province.
          </Text>
          <View style={styles.aboutDivider} />
          <Text style={styles.aboutMeta}>Version 1.0.0 — Capstone Project</Text>
          <Text style={styles.aboutMeta}>Sorsogon State University – Bulan Campus</Text>
          <Text style={styles.aboutMeta}>BSIT 3-3</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>🚪 Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 20, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 28, paddingTop: 10 },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.bgCard,
    borderWidth: 2.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 38, fontWeight: '800', color: colors.primary },
  name: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, textTransform: 'capitalize' },
  email: { fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: 10 },
  brandTag: {
    backgroundColor: colors.primaryGlow,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  brandTagText: { fontSize: 11, fontWeight: '800', color: colors.primary, letterSpacing: 1 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    marginBottom: 20,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  infoBorder: { borderBottomWidth: 1, borderBottomColor: colors.bgCardBorder },
  infoLabel: { fontSize: 13, color: colors.textMuted },
  infoValue: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, maxWidth: '60%', textAlign: 'right' },
  menuCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    marginBottom: 20,
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: colors.bgCardBorder },
  menuEmoji: { fontSize: 20 },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  menuArrow: { fontSize: 20, color: colors.textMuted },
  aboutCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    marginBottom: 24,
  },
  aboutTitle: { fontSize: 16, fontWeight: '800', color: colors.primary, marginBottom: 8 },
  aboutText: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginBottom: 12 },
  aboutDivider: { height: 1, backgroundColor: colors.bgCardBorder, marginBottom: 10 },
  aboutMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  logoutBtn: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.high,
  },
  logoutText: { color: colors.high, fontWeight: '700', fontSize: 15 },
});
