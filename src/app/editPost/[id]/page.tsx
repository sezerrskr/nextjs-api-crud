import EditPostForm from "../../components/editPostFarm";

const getPostById = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error("Failed to fetch post");
        }

        return res.json();
    } catch (error) {
        console.error(error);
    }
};

export default async function EditPost({ params }: { params: { id: string } }) {
    const postData = await getPostById(params.id);

    if (!postData || !postData.topic) {
        return <p>Post bulunamadı.</p>;
    }

    const { title, description } = postData.topic;

    return <EditPostForm id={params.id} title={title} description={description} />;
}
