import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function POST(req: NextRequest){
  try {
    
    const {email, password} = await req.json();
    console.log(email)
    console.log(password)
    if(!email || !password){
      return NextResponse.json({
        error: "All fields are required",
        success: false
      }, { status:400 })
    }

    await connectDB();

    const user = await User.findOne({email});
    if(user){
            return NextResponse.json({
        error: "User already exists",
        success: false
      }, { status:400 })
    }

    await User.create({email, password});

    return NextResponse.json({
        message: "User registered successfully",
        success: true
      }, { status:201 })

  } catch (error) {
    return NextResponse.json({
      error: "User registration failed",
      success: false
    }, { status:500 })
  }
}