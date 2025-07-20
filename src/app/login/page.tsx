"use client";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { app } from "@/lib/firebase"; // make sure you initialized Firebase

const LoginPage = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // go back to homepage after login
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
