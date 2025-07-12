"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center bg-gray-800 px-6 py-4 text-white shadow">
      <Link href="/dashboard" className="text-lg font-bold">
        Issuer Portal
      </Link>

      <div className="flex gap-4 items-center">
        <Link
          href="/dashboard"
          className="hover:underline"
        >
          Dashboard
        </Link>
       <Link href="/issue" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">
  Issue Credential
</Link>

        {auth.currentUser && (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
