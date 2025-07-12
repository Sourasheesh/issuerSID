"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RevokeButton({ id, revoked }: { id: string; revoked: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRevoke = async () => {
    setLoading(true);
    try {
      await fetch(`/credentials/${id}/revoke`, { method: "PATCH" });
      alert("Credential revoked!");
      router.refresh();
    } catch (error) {
      alert("Failed to revoke credential");
    } finally {
      setLoading(false);
    }
  };

  if (revoked) {
    return <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full">Revoked</span>;
  }

  return (
    <button
      onClick={handleRevoke}
      disabled={loading}
      className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
    >
      {loading ? "Revoking..." : "Revoke Credential"}
    </button>
  );
}
