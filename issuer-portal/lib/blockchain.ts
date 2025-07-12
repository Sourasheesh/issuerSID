import { ethers } from "ethers";

const RPC_URL = process.env.BLOCKCHAIN_RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

if (!RPC_URL) throw new Error("BLOCKCHAIN_RPC_URL is not set");
if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is not set");

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

export async function saveHashToBlockchain(hash: string) {
  const tx = await wallet.sendTransaction({
    to: wallet.address,
    value: 0,
    data: ethers.toUtf8Bytes(hash),
  });

  await tx.wait();
  return tx.hash;
}
