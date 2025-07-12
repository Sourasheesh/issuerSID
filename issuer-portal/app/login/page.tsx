"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <main className="h-screen overflow-hidden flex items-center justify-center bg-gray-900 font-sans">
      <div
        className="bg-no-repeat bg-cover bg-center relative w-full h-full"
        style={{
          backgroundImage:
            "url('https://www.bleepstatic.com/content/hl-images/2021/05/26/Microsoft-Defender.jpg')",
        }}
      >
        {/* Brand name top-left */}
        <div className="absolute top-6 left-8 z-20">
          <h1 className="text-3xl font-extrabold text-lime-400 tracking-wide">
            Sovereign<span className="text-white">Id</span>
          </h1>
          <p className="text-sm font-bold text-gray-300 tracking-wide mt-1">
            Issuer's Portal
          </p>
        </div>

        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-black opacity-80 z-0" />

        <div className="min-h-screen sm:flex sm:flex-row justify-center relative z-10">
          {/* Left side text */}
          <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl text-white">
            <div className="hidden lg:flex flex-col">
              <h1 className="mb-3 font-bold text-5xl">Log In as Issuer</h1>
              <p className="pr-3 text-gray-300">
                Log in to your secure issuer account and manage credentials seamlessly.
              </p>
            </div>
          </div>

          {/* Login box */}
          <div className="flex justify-center self-center">
            <div className="ml-8">
              <div className="p-12 bg-gray-800 mx-auto rounded-2xl w-96 shadow-lg">
                <div className="mb-4">
                  <h3 className="font-bold text-2xl text-white">Issuer Login</h3>
                  <p className="text-gray-400">
                    Access your issuer dashboard.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg text-white focus:outline-none focus:border-lime-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 tracking-wide">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-gray-700 border border-gray-600 p-2 rounded-lg text-white focus:outline-none focus:border-lime-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center bg-lime-600 hover:bg-lime-700 text-white p-3 rounded-full tracking-wide font-semibold shadow-lg transition duration-300 ease-in"
                  >
                    Log In
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-lime-400 hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
