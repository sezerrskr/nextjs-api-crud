import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        createdAt: { 
            type: Date, 
            default: () => new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }) 
        },
        updatedAt: { 
            type: Date, 
            default: () => new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }) 
        }
    }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
