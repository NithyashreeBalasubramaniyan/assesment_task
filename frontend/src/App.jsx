
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import TaskTable from './components/TaskTable';
import { useTasks } from './hooks/useTasks';
import './styles.css';

const PAGE_SIZE = 10;

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const { tasks, total, loading, error } = useTasks(
    query,
    status,
    page,
    PAGE_SIZE
  );

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const sortedTasks = [...tasks].sort((a, b) => {
    let first = a[sortBy];
    let second = b[sortBy];

    if (sortBy === 'id') {
      first = Number(first);
      second = Number(second);
      return sortOrder === 'asc' ? first - second : second - first;
    }

    first = String(first ?? '').toLowerCase();
    second = String(second ?? '').toLowerCase();

    const result = first.localeCompare(second, undefined, {
      numeric: true,
    });

    return sortOrder === 'asc' ? result : -result;
  });

  function handleSearch(value) {
    setQuery(value);
    setPage(1);
  }

  function handleStatus(value) {
    setStatus(value);
    setPage(1);
  }

  function handleSort(value) {
    if (sortBy === value) {
      setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(value);
      setSortOrder('asc');
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <div>
          <span className="eyebrow">WORKSPACE / OVERVIEW</span>
          <h1>Task Tracker</h1>
          <p className="subtitle">
            Manage tasks, monitor progress, and find work faster.
          </p>
        </div>

        <div className="header-chip">
          <span className="live-dot" />
          Task workspace
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card">
          <div className="summary-icon purple">▤</div>
          <p>Matching tasks</p>
          <h2>{total}</h2>
          <span>Based on your current filters</span>
        </article>

        <article className="summary-card">
          <div className="summary-icon blue">⌕</div>
          <p>Search</p>
          <h2>{query.trim() ? 'Active' : 'All tasks'}</h2>
          <span>
            {query.trim() ? `Keyword: ${query.trim()}` : 'No keyword applied'}
          </span>
        </article>

        <article className="summary-card">
          <div className="summary-icon orange">☷</div>
          <p>Status filter</p>
          <h2>
            {status
              ? status.replace('_', ' ')
              : 'All statuses'}
          </h2>
          <span>Filter your task list</span>
        </article>
      </section>

      <section className="tasks-panel">
        <div className="panel-heading">
          <div>
            <h2>Your tasks</h2>
            <p>Search, filter, and organize your work.</p>
          </div>
          <span className="result-count">{total} results</span>
        </div>

        <div className="controls">
          <SearchBar value={query} onChange={handleSearch} />
          <StatusFilter value={status} onChange={handleStatus} />

          <label className="sort-control">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setSortOrder('asc');
              }}
            >
              <option value="createdAt">Created date</option>
              <option value="id">Task ID</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="assignee">Assignee</option>
            </select>
          </label>

          <button
            type="button"
            className="sort-direction"
            onClick={() =>
              setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'))
            }
            aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            title="Change sort direction"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        <TaskTable
          tasks={sortedTasks}
          loading={loading}
          error={error}
          onRetry={() => {
            setPage((current) => current);
          }}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
        />

        <footer className="pagination">
          <span>
            {total === 0
              ? 'No results'
              : `Page ${page} of ${totalPages} · ${total} tasks`}
          </span>

          <div className="pagination-actions">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((current) => current - 1)}
            >
              ← Previous
            </button>
            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((current) => current + 1)}
            >
              Next →
            </button>
          </div>
        </footer>
      </section>

      <p className="app-footer">
        Task Tracker <span>·</span> Internal workspace
      </p>
    </main>
  );
}
