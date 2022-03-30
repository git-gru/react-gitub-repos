import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReposTable } from "./feataures/repos/ReposTable";
import {
  selectAllRepos,
  fetchRepos,
  reposEmptied,
} from "./feataures/repos/reposSlice";
import "./App.css";

function App() {
  const PER_PAGE = 20;
  const [query, setQuery] = useState("react");
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(query, 500);

  const dispatch = useDispatch();
  const repos = useSelector(selectAllRepos);
  const totalCount = useSelector((state) => state.repos.totalCount);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(fetchRepos({ q: debouncedQuery, page, per_page: PER_PAGE }));
    } else {
      dispatch(reposEmptied());
      setPage(1);
    }
  }, [page, debouncedQuery, dispatch]);

  const totalPages = useMemo(
    () => Math.ceil(totalCount / PER_PAGE),
    [totalCount]
  );

  if (!repos) {
    return (
      <div className="App">
        {/* {message} */}
        <button onClick={() => setPage(1)}>Go to first page</button>
      </div>
    );
  }

  return (
    <div className="App">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
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

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default App;
