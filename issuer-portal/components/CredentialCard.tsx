export default function CredentialCard({ credential }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-2">{credential.credentialType}</h3>
      <p className="mb-1">Recipient: {credential.recipientName}</p>
      <p className="mb-2">
        Status: <span className={credential.status === "active" ? "text-green-600" : "text-red-600"}>{credential.status}</span>
      </p>
      <a
        href={`https://ipfs.io/ipfs/${credential.ipfsHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-sm"
      >
        View on IPFS
      </a>
    </div>
  );
}
