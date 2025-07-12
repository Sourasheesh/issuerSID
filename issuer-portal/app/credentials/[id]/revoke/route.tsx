import { connectToDB } from "@/lib/db";
import Credential from "@/models/Credential";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectToDB();
  try {
    const credential = await Credential.findByIdAndUpdate(params.id, { revoked: true }, { new: true });
    if (!credential) {
      return NextResponse.json({ error: "Credential not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Credential revoked successfully", credential });
  } catch (error) {
    return NextResponse.json({ error: "Failed to revoke credential" }, { status: 500 });
  }
}
