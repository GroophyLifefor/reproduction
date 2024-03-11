"use client";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { connectToDatabase } from "@/lib/firestore";
import { FirebaseApp } from "firebase/app";

export default function Home() {
  const { data: session } = useSession();
  const [auth, setAuth] = useState<FirebaseApp | null>(null);

  async function initAuth() {
    const { app } = await connectToDatabase();
    // @ts-ignore
    setAuth(getAuth(app));
  }

  async function syncFirebaseAuth() {
    // @ts-ignore
    if (session && session.firebaseToken) {
      try {
        // @ts-ignore
        await signInWithCustomToken(auth, session.firebaseToken);
      } catch (error) {
        console.error("Error signing in with custom token:", error);
      }
    } else {
      // @ts-ignore
      auth.signOut();
    }
  }

  useEffect(() => {
    syncFirebaseAuth();
  }, [session]);

  // AFTER REMOVED

  return (
    <main>
      removed
    </main>
  );
}
