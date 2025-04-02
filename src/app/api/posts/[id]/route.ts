import connectMongoDB from "../../../../../libs/mongo_db";
import Post from "../../../../../models/post/post"
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params }: { params: { id: string } }) { 
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();

    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { title, description });

    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // URL'den ID'yi al

    await connectMongoDB(); // Veritabanına bağlan
    const topic = await Post.findOne({ _id: id }); // ID'ye göre veri bul

    return NextResponse.json({ topic }, { status: 200 });
}
