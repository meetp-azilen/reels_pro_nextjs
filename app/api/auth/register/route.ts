import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user.models";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return NextResponse.json(
            { error: "Email is already registered" },
            { status: 400 }
          );
    } 
    await User.create({ email, password });
    
    return NextResponse.json(
        { message: "Registration successful" },
        { status: 201 }
      );
  
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
        { error: "Failed to register User" },
        { status: 500 }
      );
  }
}
