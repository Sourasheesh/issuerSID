import axios from "axios";
import FormData from "form-data";

const pinataJWT = process.env.PINATA_JWT!;

export async function uploadToIPFS(file: Buffer) {
  const formData = new FormData();
  formData.append("file", file, "credential.pdf");

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${pinataJWT}`,
      ...formData.getHeaders(),
    },
  });

  const ipfsHash = res.data.IpfsHash;
  return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
}
