import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Credential from "@/models/Credential";
import { uploadToIPFS } from "@/lib/ipfs";
import { saveHashToBlockchain } from "@/lib/blockchain";
import { ethers } from "ethers";

export async function POST(req: Request) {
  await connectToDB();

  const formData = await req.formData();

  const recipientName = formData.get("recipientName") as string;
  const credentialType = formData.get("credentialType") as string;
  const description = formData.get("description") as string;
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload to IPFS
  const ipfsUrl = await uploadToIPFS(buffer);

  // Hash & save to blockchain
  const hash = ethers.keccak256(buffer);
  const blockchainHash = await saveHashToBlockchain(hash);

  // Save to DB
  const newCredential = await Credential.create({
    recipientName,
    credentialType,
    description,
    ipfsUrl,
    blockchainHash,
  });

  // ✅ Now wrap it correctly
  return NextResponse.json({
    message: "Credential issued successfully!",
    credential: newCredential,
  });
}
