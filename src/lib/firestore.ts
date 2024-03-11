import { FirebaseApp, initializeApp } from "firebase/app";
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
// import * as admin from 'firebase-admin'

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG || "");
let cachedDb = <Firestore | null>null;
let cachedApp = <FirebaseApp | null> null;

export function connectToDatabaseNotAsync() {
  if (cachedDb) {
    return {
      db: cachedDb,
      app: cachedApp,
      collection: (collectionName: string) =>
        cachedDb
          ? collection(cachedDb, collectionName)
          : ({} as CollectionReference<DocumentData, DocumentData>),
      addDoc: (collectionName: string, data: any) => {
        return cachedDb
          ? addDoc(collection(cachedDb, collectionName), data)
          : {};
      },
    };
  }

  const app = initializeApp(firebaseConfig);
  // if (!admin.apps.length) {
  //   admin.initializeApp({
  //     credential: admin.credential.cert({
  //       projectId: process.env.FIREBASE_PROJECT_ID,
  //       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //       privateKey: process.env.FIREBASE_PRIVATE_KEY,
  //     }),
  //   })
  // }
  const db = getFirestore(app);
  

  cachedDb = db;
  cachedApp = app;

  return {
    db: cachedDb,
    app: cachedApp,
    collection: (collectionName: string) =>
      cachedDb
        ? collection(cachedDb, collectionName)
        : ({} as CollectionReference<DocumentData, DocumentData>),
    addDoc: (collectionName: string, data: any) => {
      return cachedDb
        ? addDoc(collection(cachedDb, collectionName), data)
        : {};
    },
  };
}

export async function connectToDatabase() {
  if (cachedDb) {
    return {
      db: cachedDb,
      app: cachedApp,
      collection: (collectionName: string) =>
        cachedDb
          ? collection(cachedDb, collectionName)
          : ({} as CollectionReference<DocumentData, DocumentData>),
      addDoc: async (collectionName: string, data: any) => {
        return cachedDb
          ? await addDoc(collection(cachedDb, collectionName), data)
          : {};
      },
    };
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  cachedDb = db;
  cachedApp = app;

  return {
    db: cachedDb,
    app: cachedApp,
    collection: (collectionName: string) =>
      cachedDb
        ? collection(cachedDb, collectionName)
        : ({} as CollectionReference<DocumentData, DocumentData>),
    addDoc: async (collectionName: string, data: any) => {
      return cachedDb
        ? await addDoc(collection(cachedDb, collectionName), data)
        : {};
    },
  };
}
