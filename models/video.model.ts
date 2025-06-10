import mongoose,{Schema, model,models} from "mongoose";

export const VIDEO_DIMENSION ={
    width: 1080,
    height: 1920,

} as const

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    controls?: boolean;
    transformation?: {
        width: number;
        height: number;
        quality?: number;
    },
    createdAt?: Date;
    updatedAt?: Date;
}
const videoSchema = new Schema<IVideo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    controls: { type: Boolean, default: true },
    transformation: {
        width: { type: Number, default: VIDEO_DIMENSION.width },
        height: { type: Number, default: VIDEO_DIMENSION.height },
        quality: { type: Number, default: 75 }, // Default quality
    }
}, { timestamps: true });

export const Video = models?.Video || model<IVideo>('Video', videoSchema);