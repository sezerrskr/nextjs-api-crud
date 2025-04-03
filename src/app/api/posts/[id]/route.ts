import connectMongoDB from "../../../../../libs/mongo_db";
import Post from "../../../../../models/post/post";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();

    await connectMongoDB(); // MongoDB'ye bağlan

    // Veritabanında ilgili postu bul ve güncelle
    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { 
            title, 
            description, 
            updatedAt: new Date(), // `updatedAt` alanını şu anki tarih ile güncelle
        },
        { new: true } // Yeni güncellenen veriyi döndür
    );

    if (!updatedPost) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post updated", updatedPost }, { status: 200 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    await connectMongoDB(); // MongoDB'ye bağlan

    try {
        // ID'ye göre postu bul ve sil
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting post", error }, { status: 500 });
    }
}