import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Your Firebase config - Replace with your actual config
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// For development - connect to emulators if running locally
if (process.env.NODE_ENV === 'development' && !window.location.hostname.includes('firebase')) {
  try {
    // Only connect if not already connected
    if (!auth.emulatorConfig) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    // Only connect if not already connected
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    console.log('Emulator connection failed, using production Firebase');
  }
}

export default app;
