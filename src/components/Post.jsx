import { format } from "date-fns"; // Ensure this import is present
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`https://blog-application-backend-9vrl.onrender.com/${cover}`} alt={title} />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <Link to={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
