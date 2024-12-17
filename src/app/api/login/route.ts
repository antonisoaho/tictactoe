import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { username } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "4h",
    });
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
