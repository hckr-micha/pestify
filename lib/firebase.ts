import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCUgdpJz3IhLDmDKVJPiq4QWiTUH7l1pUc",
  authDomain: "pestify-39041.firebaseapp.com",
  projectId: "pestify-39041",
  storageBucket: "pestify-39041.firebasestorage.app",
  messagingSenderId: "563198301934",
  appId: "1:563198301934:web:60f372764288aa677705ff"
};

// Prevent re-initializing on hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default app;