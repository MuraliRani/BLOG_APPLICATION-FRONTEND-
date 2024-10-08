import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null); // Default to null instead of empty string
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`https://blog-application-backend-9vrl.onrender.com/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files[0]);
    }

    const response = await fetch("https://blog-application-backend-9vrl.onrender.com/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      console.error("Failed to update post:", response.statusText);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text" // Changed to "text" as "summary" is not a valid input type
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
};

export default CreatePost;
