import mongoose, { Schema } from "mongoose";

const CredentialSchema = new Schema({
  recipientName: String,
  credentialType: String,
  description: String,
  issuedDate: { type: Date, default: Date.now },
  ipfsUrl: String,
  blockchainHash: String,
  revoked: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Credential || mongoose.model("Credential", CredentialSchema);
