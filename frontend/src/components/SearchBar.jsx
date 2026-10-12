
export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-control">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        className="search-input"
        placeholder="Search ID, title, description, assignee, priority..."
        aria-label="Search tasks by ID, title, description, assignee, or priority"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button
          type="button"
          className="clear-search"
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          ×
        </button>
      )}
    </label>
  );
}
