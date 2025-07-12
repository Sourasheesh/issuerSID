"use client";

import { useState } from "react";
import axios from "axios";

export default function CredentialForm({ onIssued }: { onIssued?: (cred: any) => void }) {
  const [form, setForm] = useState({
    recipientName: "",
    credentialType: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipientName", form.recipientName);
    formData.append("credentialType", form.credentialType);
    formData.append("description", form.description);
    if (file) formData.append("file", file);

    try {
      const res = await axios.post("/api/credentials/issue", formData);
      alert("Credential issued successfully!");

      if (onIssued) {
        onIssued(res.data.credential);
      }
    } catch (error) {
      console.error("Error issuing credential:", error);
      alert("Failed to issue credential");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Recipient Name"
        value={form.recipientName}
        onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
        className="w-full border rounded p-2"
        required
      />
      <input
        type="text"
        placeholder="Credential Type"
        value={form.credentialType}
        onChange={(e) => setForm({ ...form, credentialType: e.target.value })}
        className="w-full border rounded p-2"
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border rounded p-2"
        required
      ></textarea>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full border rounded p-2"
        required
      />
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
      >
        Issue Credential
      </button>
    </form>
  );
}
