
export default function StatusFilter({ value, onChange }) {
  return (
    <label className="filter-control">
      <span className="filter-label">Status</span>
      <select
        className="status-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">All statuses</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </label>
  );
}
