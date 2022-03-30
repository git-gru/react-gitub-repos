import { useState, useEffect, useMemo, useCallback } from "react";
import { ReposTable } from "./feataures/repos/ReposTable";
import "./App.css";

function App() {
  const PER_PAGE = 20;
  const [query, setQuery] = useState("react");
  const [totalCount, setTotalCount] = useState(0);
  const [repos, setRepos] = useState([]);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);

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
        <button onClick={() => setPage(1)}>Go to first page</button>
      </div>
    );
  }

  return (
    <div className="App">
      <ReposTable repos={repos} />
      <div className="pagination-container">
        <button disabled={page === 1} onClick={() => setPage(1)}>
          &lt;&lt;
        </button>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          &lt;
        </button>
        {page}&nbsp;/&nbsp;{totalPages}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          &gt;
        </button>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(totalPages)}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default App;
