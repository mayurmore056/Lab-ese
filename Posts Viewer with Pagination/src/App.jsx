import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);

  const postsPerPage = 10;

  // Fetch data
  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const start = (page - 1) * postsPerPage;
  const currentPosts = posts.slice(start, start + postsPerPage);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h2>Posts Viewer</h2>

      {/* Cards */}
      <div className="grid">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="card"
            onClick={() => setSelectedPost(post)}
          >
            <h4>{post.title}</h4>
            <p>{post.body.slice(0, 80)}...</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="modal" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPost.title}</h3>
            <p>{selectedPost.body}</p>
            <button onClick={() => setSelectedPost(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
