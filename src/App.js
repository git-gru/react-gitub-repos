import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const PER_PAGE = 20;
  const [query, setQuery] = useState("react");
  const [totalCount, setTotalCount] = useState(0);
  const [repos, setRepos] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(0);

  const fetchRepos = useCallback(async (q, page, per_page) => {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${q}&page=${page}&per_page=${per_page}`
    );
    const jsonData = await res.json();
    setRepos(jsonData.items);
    setMessage(jsonData.message);
    setTotalCount(jsonData.total_count);
  }, []);

  useEffect(() => {
    fetchRepos(query, page, PER_PAGE);
  }, [fetchRepos, page, query]);

  const totalPages = useMemo(
    () => Math.ceil(totalCount / PER_PAGE),
    [totalCount]
  );

  if (!repos) {
    return (
      <div className="App">
        {message}
        <button onClick={() => setPage(0)}>Go to first page</button>
      </div>
    );
  }

  if (repos.length === 0) {
    return null;
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Description</th>
            <th>Link</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.id}>
              <td>{repo.full_name}</td>
              <td>{repo.description}</td>
              <td>{repo.url}</td>
              <td>{repo.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button disabled={page === 0} onClick={() => setPage(0)}>
          &lt;&lt;
        </button>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          &lt;
        </button>
        {page + 1}&nbsp;/&nbsp;{totalPages}
        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          &gt;
        </button>
        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(totalPages - 1)}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default App;
