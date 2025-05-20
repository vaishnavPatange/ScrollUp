import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920
} as const

export interface IVideo{
  _id?: mongoose.Types.ObjectId;
  title: string;
  videoUrl: string;
  thumbnail: string;
  description: string;
  controls?: boolean;
  transformation:{
    width: number;
    height: number;
    quality: number;
  },
  createdAt?:Date;
  updatedAt?:Date;
}

const videoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
  },
  videoUrl:{
    type: String,
    required: true,
    unique: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  controls:{
    type: Boolean
  },
  transformation: {
    height: {
      type: Number,
      default: VIDEO_DIMENSIONS.height
    },
    width: {
      type:Number,
      default: VIDEO_DIMENSIONS.width
    },
    quality:{
      type: Number,
      min: 1,
      max: 100
    }
  }
}, {timestamps: true})

 const Video = models?.Video || model<IVideo>("Video", videoSchema);

 export default Video;