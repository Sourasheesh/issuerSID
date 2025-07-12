import { connectToDB } from "@/lib/db";
import Credential from "@/models/Credential";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  const credentials = await Credential.find().sort({ createdAt: -1 }).lean();

  const formatted = credentials.map((cred) => ({
    ...cred,
    _id: cred._id.toString(),
  }));

  return NextResponse.json(formatted);
}
