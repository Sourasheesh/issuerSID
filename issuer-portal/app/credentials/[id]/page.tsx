import { connectToDB } from "@/lib/db";
import Credential from "@/models/Credential";
import Link from "next/link";
import RevokeButton from "@/components/RevokeButton";

export default async function CredentialDetailPage({ params }: { params: { id: string } }) {
  await connectToDB();
  const credential = await Credential.findById(params.id).lean();

  if (!credential) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Credential not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-y-auto font-sans">
      <div
        className="bg-no-repeat bg-cover bg-center relative w-full min-h-screen"
        style={{
          backgroundImage:
            "url('https://e0.pxfuel.com/wallpapers/525/859/desktop-wallpaper-blue-abstract-tech-background-windows-10-blue-dark-blue-abstract-technology.jpg')",
        }}
      >
        {/* Green gradient overlay */}
        <div className="absolute bg-gradient-to-br from-green-900 via-green-800 to-black opacity-80 inset-0 z-0" />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-3xl rounded-2xl bg-gray-800 p-8 shadow-xl border border-gray-700">
            <h1 className="text-4xl font-extrabold text-lime-400 mb-6">
              Credential Details
            </h1>

            <div className="space-y-4 text-gray-200">
              <p><strong>Recipient:</strong> {credential.recipientName}</p>
              <p><strong>Type:</strong> {credential.credentialType}</p>
              <p><strong>Description:</strong> {credential.description}</p>
              <p>
                <strong>IPFS URL:</strong>{" "}
                <a
                  href={credential.ipfsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 underline hover:text-lime-300 transition"
                >
                  View Document
                </a>
              </p>
              <p>
                <strong>Blockchain Txn:</strong>{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${credential.blockchainHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lime-400 underline hover:text-lime-300 transition"
                >
                  Verify on Chain
                </a>
              </p>

              {/* Status */}
              <div className="flex items-center gap-4 mt-6">
                <RevokeButton id={credential._id.toString()} revoked={credential.revoked} />
              </div>
            </div>

            <Link
              href="/dashboard"
              className="inline-block mt-8 bg-lime-600 hover:bg-lime-700 text-white px-5 py-2 rounded-full transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
