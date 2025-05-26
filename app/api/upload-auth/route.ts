import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET(){

  try {
       const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    })

    return NextResponse.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY, 
                                success: true,
                                text: "File upload success" })
  } catch (error) {
    return NextResponse.json({
      message: "Imagekit auth failed",
      status: 500,
      success: true,
      text: "File upload failed" 
    })
  }

}