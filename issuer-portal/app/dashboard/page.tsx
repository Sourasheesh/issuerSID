"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function DashboardPage() {
  const [credentials, setCredentials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login");
      return;
    }

    const fetchCredentials = async () => {
      try {
        const res = await fetch("/api/credentials");
        const data = await res.json();
        setCredentials(data);
      } catch (error) {
        console.error("Error fetching credentials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-y-auto font-sans">
      <div
        className="bg-no-repeat bg-cover bg-center relative w-full min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        {/* Green overlay */}
        <div className="absolute bg-gradient-to-br from-green-900 via-green-800 to-black opacity-80 inset-0 z-0" />

        {/* Make sure Navbar is above overlay */}
        <div className="relative z-20">
          <Navbar />
        </div>

        <div className="relative z-10 p-8">
          <h1 className="text-4xl font-extrabold text-lime-400 mb-4">
            Issuer Dashboard
          </h1>
          <p className="text-gray-300 mb-8">
            Manage your issued credentials below.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="p-3 text-left">Recipient</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {credentials.map((cred) => (
                  <tr
                    key={cred._id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="p-3 text-gray-200">{cred.recipientName}</td>
                    <td className="p-3 text-gray-200">{cred.credentialType}</td>
                    <td className="p-3 text-gray-200">
                      {new Date(cred.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <Link href={`/credentials/${cred._id}`}>
                        <button className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-1 rounded-full transition">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {credentials.length === 0 && (
              <p className="mt-4 text-gray-300">No credentials issued yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
