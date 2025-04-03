"use client";

import { useRouter } from "next/navigation";

// id parametresi string türünde olacağını belirtiyoruz
interface DeletePostProps {
    id: string;
}

export default function deletePostFarm({ id }: DeletePostProps) {
    const router = useRouter();

    const removeTopic = async () => {
        const confirmed = confirm("Emin misin?");

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Post başarıyla silindi!");
                router.push("/"); // Silme işleminden sonra ana sayfaya yönlendir
            } else {
                alert("Post silinirken bir hata oluştu.");
            }
        }
    };

    return (
        <button onClick={removeTopic} className="text-red-400">
            Sil
        </button>
    );
}
