import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView,
  Platform, ScrollView, ActivityIndicator, Image
} from 'react-native';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { router } from 'expo-router';
import { colors } from '../lib/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace('/(tabs)');
    } catch (e: any) {
      const msg =
        e.code === 'auth/user-not-found' ? 'No account found with this email'
        : e.code === 'auth/wrong-password' ? 'Incorrect password'
        : e.code === 'auth/email-already-in-use' ? 'Email already registered'
        : e.code === 'auth/invalid-email' ? 'Invalid email address'
        : e.message;
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* Logo */}
        <View style={styles.logoSection}>
          {/* Try to load logo.png; falls back to emoji if not yet added */}
          <Image
        source={require('../assets/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
        />
          <Text style={styles.brand}>PESTIFY</Text>
          <Text style={styles.brandSub}>SOLUTIONS</Text>
          <Text style={styles.tagline}>Pest detection & service booking</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@email.com"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 6 characters"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={colors.bg} />
              : <Text style={styles.buttonText}>
                  {isSignUp ? 'Create Account' : 'Login'}
                </Text>
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchBtn} onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.switchText}>
              {isSignUp
                ? 'Already have an account? Login'
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoImage: {
  width: 160,
  height: 160,
  marginBottom: 8,
  },
  brand: {
    fontSize: 38,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 6,
  },
  brandSub: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.teal,
    letterSpacing: 8,
    marginTop: -2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  form: {
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 6,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.bgCardBorder,
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.bg,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.bg,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  switchBtn: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  switchText: {
    color: colors.teal,
    fontSize: 14,
  },
});
