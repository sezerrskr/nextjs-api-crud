import React, { useEffect, useState } from "react";
import styles from "./post.module.css";
import { spawn } from "child_process";

// Post tipi
type PostType = {
    _id: string;
    title: string;
    updatedAt: string;
    createdAt: string;
    description: string;
};

// Postları getiren fonksiyon
const getPosts = async (): Promise<PostType[]> => {
    try {
        const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });

        if (!res.ok) {
            throw new Error("Failed to fetch posts");
        }

        const data = await res.json();

        // API'den dönen verinin gerçekten bir dizi olup olmadığını kontrol et
        if (!Array.isArray(data)) {
            console.log("Unexpected API response:", data);
            return [];
        }

        return data;
    } catch (error) {
        console.log("Error loading posts:", error);
        return [];
    }
};

// Post bileşeni
export default async function Post() {
    const posts: PostType[] = await getPosts(); // Doğrudan diziyi al

    if (!posts || posts.length === 0) {
        return <p>No posts available.</p>;
    }

    return (
        <>
            {posts.map((t) => (
                <div key={t._id} className={styles.container}>
                    <div className={styles.post}>
                        <div className={styles.postInfo}>
                            <h4 className={styles.postAuth}>@sezerskr</h4>
                            <span>/</span>
                            <h4 className={styles.postDate}>{t.updatedAt}</h4>
                            {t.createdAt === t.updatedAt ? (<span></span>) : ( <span className={styles.postUpdated}>/</span>)}
                            {t.createdAt === t.updatedAt ? (<span></span>) : ( <span className={styles.postUpdated}>düzenlenmiş, eski tarih: {t.createdAt}</span>)}
                        </div>
                        <div className={styles.postInfo}>
                            <h2>{t.title}</h2>
                        </div>
                        <div className={styles.postContent}>
                            <p>{t.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
