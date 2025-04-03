import React, { useEffect, useState } from "react";
import styles from "./post.module.css";
import Link from "next/link";
import DeletePostFarm from "../deletePostFarm";

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

// Tarih formatlama fonksiyonu
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
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
                            <h4 className={styles.postDate}>{formatDate(t.createdAt)}</h4>
                            {t.createdAt === t.updatedAt ? (
                                <></>
                            ) : (
                                <span className={styles.postUpdated}>/</span>
                            )}
                            {t.createdAt === t.updatedAt ? (
                                <></>
                            ) : (
                                <span className={styles.postUpdated}>
                                    {formatDate(t.updatedAt)} tarihinde düzenlenmiş.
                                </span>
                            )}
                            <span>/</span>
                            <div className={styles.postSettings}>
                                <Link href={`/editPost/${t._id}`} className={styles.postEdit}>Düzenle </Link>
                                <span>/</span>
                                <DeletePostFarm id={t._id} /> 
                            </div>
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
