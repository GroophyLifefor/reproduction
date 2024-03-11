/*

import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";
import { connectToDatabaseNotAsync } from "@/lib/firestore";
import NextAuth from "next-auth";
const { app, db } = connectToDatabaseNotAsync();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [], // Add an empty array or configure the desired authentication providers
  adapter: FirebaseAdapter({
    db,
    collection,
    query,
    getDocs,
    where,
    limit,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    runTransaction,
  }),
});

*/
/*

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FirebaseAdapter from "@next-auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: FirebaseAdapter as Adapter,
  secret: "http://127.0.0.1:3000/api/auth",
};

*/
/*

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapterConfig, FirestoreAdapter } from "@next-auth/firebase-adapter";
import { Adapter } from "next-auth/adapters";
import { connectToDatabaseNotAsync } from "@/lib/firestore";
const { db } = connectToDatabaseNotAsync();
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseClient = {
  db,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: FirestoreAdapter(firebaseClient as FirebaseAdapterConfig) as Adapter,
  secret: "http://127.0.0.1:3000/api/auth",
};
*/

import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import * as admin from 'firebase-admin'

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  // https://next-auth.js.org/providers
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_ID as string,
          clientSecret: process.env.GOOGLE_SECRET as string,
      }),
  ],
  // see https://authjs.dev/reference/adapter/firebase#usage
  // adapter: FirestoreAdapter({}),
    adapter: FirestoreAdapter({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    }) as Adapter,
  callbacks: {
    async session({ session, token }) {
      // ...
      if (token && token.uid) {
        const firebaseToken = await admin.auth().createCustomToken(token.uid as string)
        // @ts-ignore
        session.firebaseToken = firebaseToken
      }
      return session
    },
  },
  session: {
      strategy: 'jwt',
  },
}