/**
 * Authentication Module for Bhautik Vekariya Portfolio CMS
 * Manages Firebase Authentication with fallback session handling
 */

import { ADMIN_CREDENTIAL_CONFIG, isFirebaseConfigured } from './firebase-config.js';

// Local administrator session key for demo/offline verification
const AUTH_SESSION_KEY = 'bv_admin_auth_token';

export const AuthService = {
  // Check if currently authenticated
  isAuthenticated() {
    return !!sessionStorage.getItem(AUTH_SESSION_KEY) || !!localStorage.getItem(AUTH_SESSION_KEY);
  },

  // Get current admin user metadata
  getCurrentUser() {
    if (!this.isAuthenticated()) return null;
    return {
      username: ADMIN_CREDENTIAL_CONFIG.defaultUsername,
      email: ADMIN_CREDENTIAL_CONFIG.mappedEmail,
      role: 'Administrator'
    };
  },

  // Sign in administrator
  async signIn(usernameOrEmail, password, rememberMe = false) {
    const input = String(usernameOrEmail || '').trim();
    const cleanPassword = String(password || '').trim();

    if (!input || !cleanPassword) {
      throw new Error('Please enter both username/email and password.');
    }

    // Map username 'admin' to configured administrator email
    let resolvedEmail = input;
    if (input.toLowerCase() === ADMIN_CREDENTIAL_CONFIG.defaultUsername.toLowerCase()) {
      resolvedEmail = ADMIN_CREDENTIAL_CONFIG.mappedEmail;
    }

    // Check if Firebase is provisioned with live project keys
    if (isFirebaseConfigured()) {
      try {
        // Dynamically import Firebase Auth SDK when live
        const { initializeApp, getApps } = await import('firebase/app');
        const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
        const { firebaseConfig } = await import('./firebase-config.js');

        const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const userCredential = await signInWithEmailAndPassword(auth, resolvedEmail, cleanPassword);
        const token = await userCredential.user.getIdToken();

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(AUTH_SESSION_KEY, JSON.stringify({
          token,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          timestamp: Date.now()
        }));

        return { success: true, email: userCredential.user.email };
      } catch (fbErr) {
        console.error('Firebase Auth Error:', fbErr);
        throw new Error(fbErr.message || 'Firebase authentication failed. Check credentials or security settings.');
      }
    } else {
      // Safe initial verification flow for unconfigured Firebase or initial setup
      // Handles username 'admin' or email 'admin@bhautikvekariya.dev' with requested password 'parth1221'
      const isValidAdmin = (
        (input.toLowerCase() === 'admin' || input.toLowerCase() === ADMIN_CREDENTIAL_CONFIG.mappedEmail.toLowerCase()) &&
        cleanPassword === 'parth1221'
      );

      if (isValidAdmin) {
        const sessionPayload = JSON.stringify({
          token: 'demo-admin-token-' + Date.now(),
          email: ADMIN_CREDENTIAL_CONFIG.mappedEmail,
          uid: 'admin-local-1',
          timestamp: Date.now()
        });

        if (rememberMe) {
          localStorage.setItem(AUTH_SESSION_KEY, sessionPayload);
        } else {
          sessionStorage.setItem(AUTH_SESSION_KEY, sessionPayload);
        }

        return {
          success: true,
          email: ADMIN_CREDENTIAL_CONFIG.mappedEmail,
          isTemporaryCredential: true
        };
      } else {
        throw new Error('Invalid administrator credentials. Please check your username or password.');
      }
    }
  },

  // Sign out administrator
  async signOut() {
    try {
      if (isFirebaseConfigured()) {
        const { getAuth, signOut } = await import('firebase/auth');
        const auth = getAuth();
        await signOut(auth);
      }
    } catch (e) {
      console.warn('Firebase signout notification:', e);
    }

    sessionStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(AUTH_SESSION_KEY);
    return true;
  },

  // Password reset procedure
  async sendPasswordReset(email) {
    const targetEmail = String(email || '').trim();
    if (!targetEmail) {
      throw new Error('Please specify an administrator email address.');
    }

    if (isFirebaseConfigured()) {
      const { getAuth, sendPasswordResetEmail } = await import('firebase/auth');
      const auth = getAuth();
      await sendPasswordResetEmail(auth, targetEmail);
      return `Password reset link has been dispatched to ${targetEmail}.`;
    } else {
      return `Password reset instruction: To configure or update password in production, use Firebase Console -> Authentication -> Users -> Reset Password.`;
    }
  }
};
