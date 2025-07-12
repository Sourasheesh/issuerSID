"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import CredentialForm from "@/components/CredentialForm";

export default function IssuePage() {
  const [claimLink, setClaimLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login");
    }
  }, [router]);

  const handleIssued = (credential: any) => {
    const walletBaseUrl = "https://your-wallet-app.com/claim";

    const credentialData = {
      recipientName: credential.recipientName,
      credentialType: credential.credentialType,
      description: credential.description,
      ipfsUrl: credential.ipfsUrl,
      blockchainHash: credential.blockchainHash,
    };

    const encoded = Buffer.from(JSON.stringify(credentialData)).toString("base64");
    const link = `${walletBaseUrl}?data=${encoded}`;

    setClaimLink(link);
  };

  return (
    <main className="min-h-screen overflow-y-auto font-sans">
      <div
        className="bg-no-repeat bg-cover bg-center relative w-full min-h-screen"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg')",
        }}
      >
        {/* Green abstract overlay */}
        <div className="absolute bg-gradient-to-br from-green-900 via-green-800 to-black opacity-80 inset-0 z-0" />

        {/* Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center py-12 relative z-10 px-4">
          <div className="w-full max-w-3xl rounded-2xl bg-gray-800 p-8 shadow-xl border border-gray-700">
            <h1 className="mb-6 text-center text-3xl font-bold text-lime-400">
              Issue Credential
            </h1>
            {/* The CredentialForm component should use these improved input styles: */}
            <CredentialForm onIssued={handleIssued} />

            {claimLink && (
              <div className="mt-8">
                <p className="font-bold mb-2 text-gray-200">Wallet Claim Link:</p>
                <input
                  value={claimLink}
                  readOnly
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:border-lime-400 transition duration-200 placeholder-gray-400"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
