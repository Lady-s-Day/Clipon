import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getAnalytics } from "firebase/analytics";

// add firebase config
const firebaseConfig = {
  // apiKey: Constants.manifest.extra.apiKey,
  // authDomain: Constants.manifest.extra.authDomain,
  // projectId: Constants.manifest.extra.projectId,
  // storageBucket: Constants.manifest.extra.storageBucket,
  // messagingSenderId: Constants.manifest.extra.messagingSenderId,
  // appId: Constants.manifest.extra.appId,
  apiKey: "AIzaSyDUVI2nOVYdz74jDk9OG-G0gKiYpCpMJwc",
  authDomain: "clipon-871e1.firebaseapp.com",
  projectId: "clipon-871e1",
  storageBucket: "clipon-871e1.appspot.com",
  messagingSenderId: "842723940344",
  appId: "1:842723940344:web:bd3b36cecd1e138cb2e80d",
  measurementId: "G-QCKL71WDYB"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// const analytics = getAnalytics(app);
export { auth };
