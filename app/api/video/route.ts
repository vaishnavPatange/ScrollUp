import { NextResponse, NextRequest } from "next/server";
import Video, { IVideo } from "@/models/video";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth-options";


export async function GET(){
  try {
    await connectDB();

    const videos = await Video.find().sort({createdAt: -1}).lean();
    if(!videos || videos.length === 0){
      return NextResponse.json([], {status: 200});
    }

    return NextResponse.json({videos, success: true, status: 200});

  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch videos",
      success: false,
      status: 500
    })
  }
} 


export async function POST(request: NextRequest){
  try {
    const session = getServerSession(authOptions);
    if(!session){
      return NextResponse.json({
        message: "User not loggedin",
        success: false
      }, {status: 401})
    }

    await connectDB();
    const reqBody:IVideo = await request.json();
    if(
        !reqBody.title ||
        !reqBody.thumbnail ||
        !reqBody.description ||
        !reqBody.videoUrl
    ){
      return NextResponse.json({
        message: "Something is missing",
        success: false
      }, {status: 400})
    }

   const newVideo = await Video.create({
      ...reqBody,
      controls: reqBody?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: reqBody.transformation?.quality ?? 100
      }
    })

    return NextResponse.json({
      newVideo,
      message: "Videos posted successfully",
      success: true
    }, {status: 201})

  } catch (error) {
    if(error instanceof Error){
    return NextResponse.json({
      message: "Failed to post video",
      success: false
    }, {status: 500})
    }
  }
}