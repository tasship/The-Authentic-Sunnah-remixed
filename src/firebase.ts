import { getApps, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { doc, getDocFromServer, getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Dedicated Firebase Analytics client configuration (preserves provisioned Firestore DB above)
const analyticsFirebaseConfig = {
  apiKey: 'AIzaSyA2M-r99e6VZv9xfjsjWedN69lFHJ_chEk',
  authDomain: 'the-authentic-sunnah-b5591.firebaseapp.com',
  projectId: 'the-authentic-sunnah-b5591',
  storageBucket: 'the-authentic-sunnah-b5591.firebasestorage.app',
  messagingSenderId: '747746678927',
  appId: '1:747746678927:web:b9761fef3ff63e480778fa',
  measurementId: 'G-2LW5RQJ5L4',
};

const analyticsApp =
  getApps().find((existing) => existing.name === 'tas-analytics') ??
  initializeApp(analyticsFirebaseConfig, 'tas-analytics');

let analyticsInstance: Analytics | null = null;
let analyticsInitPromise: Promise<Analytics | null> | null = null;

export function getAnalyticsClient(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (typeof navigator !== 'undefined' && !navigator.onLine) return Promise.resolve(null);
  if (analyticsInstance) return Promise.resolve(analyticsInstance);
  if (!analyticsInitPromise) {
    analyticsInitPromise = isSupported()
      .then((supported) => {
        if (!supported) return null;
        analyticsInstance = getAnalytics(analyticsApp);
        return analyticsInstance;
      })
      .catch(() => null);
  }
  return analyticsInitPromise;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return;
  }
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

void testConnection();
