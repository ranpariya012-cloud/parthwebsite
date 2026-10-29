/**
 * Firebase Configuration for Parth Ranpariya Portfolio & CMS
 * 
 * Replace the values below with your Firebase Web App configuration
 * obtained from the Firebase Console (Project Settings -> General -> Your apps -> Web app).
 */

export const firebaseConfig = {
  apiKey: "AIzaSyYOUR_API_KEY_HERE",
  authDomain: "parth-portfolio.firebaseapp.com",
  projectId: "parth-portfolio",
  storageBucket: "parth-portfolio.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Check if user has replaced placeholder credentials
export function isFirebaseConfigured() {
  return (
    firebaseConfig.apiKey &&
    !firebaseConfig.apiKey.includes("YOUR_API_KEY") &&
    firebaseConfig.projectId !== "parth-portfolio"
  );
}

// Admin username to email mapping configuration
export const ADMIN_CREDENTIAL_CONFIG = {
  defaultUsername: "admin",
  mappedEmail: "ranpariya012@gmail.com",
  initialPasswordNote: "Initial temporary password: parth1221. Please change upon first login."
};
