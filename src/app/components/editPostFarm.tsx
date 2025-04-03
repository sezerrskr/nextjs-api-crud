"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../addPost/addPost.module.css";

export default function EditPostForm({ id, title, description }: { id: string; title: string; description: string }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const router = useRouter();

    // 🔥 useEffect kullanarak title ve description'ı state'e ata
    useEffect(() => {
        setNewTitle(title);
        setNewDescription(description);
    }, [title, description]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ newTitle: newTitle, newDescription: newDescription }), // Veriyi doğru formatta gönder
            });
    
            if (!res.ok) {
                throw new Error("Failed to update post");
            }
    
            const data = await res.json(); // API cevabını al ve kontrol et
            console.log("Güncellenen veri:", data);
    
            router.push("/"); // Güncelledikten sonra anasayfaya yönlendir
        } catch (error) {
            console.error("Güncelleme hatası:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className={styles.postTitle}
                placeholder="Post Title"
            />

            <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className={styles.postDesc}
                placeholder="Post Description"
            />

            <button type="submit" className={styles.postButton}>Update Post</button>
        </form>
    );
}
