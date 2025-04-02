import connectMongoDB from "../../../../../libs/mongo_db";
import Post from "../../../../../models/post/post";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) { 
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();

    await connectMongoDB();
    
    // Güncelleme işlemine 'updatedAt' alanını da ekleyin
    await Post.findByIdAndUpdate(
        id, 
        { 
            title, 
            description, 
            updatedAt: new Date() // updatedAt'ı şu anki tarihe ayarlayın
        }
    );

    return NextResponse.json({ message: "Post updated" }, { status: 200 });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // URL'den ID'yi al

    await connectMongoDB(); // Veritabanına bağlan
    const topic = await Post.findOne({ _id: id }); // ID'ye göre veri bul

    return NextResponse.json({ topic }, { status: 200 });
}
