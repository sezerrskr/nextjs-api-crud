"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./addPost.module.css"
import { styleText } from "util";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={styles.postTitle}
        type="text"
        placeholder="Post Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={styles.postDesc}
        type="text"
        placeholder="Post Description"
      />

      <button
        type="submit"
        className={styles.postButton}
      >
        Add Post
      </button>
    </form>
  );
}