import { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://blog-application-backend-9vrl.onrender.com/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
};

export default IndexPage;
