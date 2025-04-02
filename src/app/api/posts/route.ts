import connectMangoDB from "@/../libs/mongo_db";
import Post from "@/../models/post/post";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export async function POST(request: Request) {
    try {
        const { title, description } = await request.json();
        await connectMangoDB();
        await Post.create({ title, description });
        return NextResponse.json({ message: "Post Created" }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error creating post", error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMangoDB();
        const posts = await Post.find();

        const formattedPosts = posts.map(post => ({
            ...post._doc,
            createdAt: new Date(post.createdAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" }),
            updatedAt: new Date(post.updatedAt).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })
        }));

        return NextResponse.json(formattedPosts, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error fetching posts", error: error.message }, { status: 500 });
    }
}

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get("postId");

        if (!postId) {
            return NextResponse.json({ message: "ID not found" }, { status: 400 });
        }

        if (!Types.ObjectId.isValid(postId)) {
            return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
        }

        const deletedPost = await Post.findByIdAndDelete(new Types.ObjectId(postId));

        if (!deletedPost) {
            return NextResponse.json({ message: "Post not found in the database" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error deleting post", error: error.message }, { status: 500 });
    }
};
