import PropTypes from "prop-types";

export const SQLTables = ({
  tables,
  selectedTable,
  setSelectedTable,
  initialRender,
}) => {
  return (
    <div data-cy="database-tables">
      <h5 className="my-2">Database Tables ({tables.length} in total)</h5>
      <div className="dropdown">
        <button
          type="button"
          className="btn btn-outline-dark dropdown-toggle w-100"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-cy="table-dropdown-btn"
        >
          Selected table: {selectedTable}
        </button>
        <ul className="dropdown-menu w-100">
          {tables.map((table) => (
            <li
              key={table}
              onClick={() => {
                setSelectedTable(table);
                initialRender.current++;
              }}
              className="w-100"
            >
              <span
                className={`dropdown-item ${
                  selectedTable === table && "bg-dark text-light"
                }`}
              >
                {table}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

SQLTables.propTypes = {
  tables: PropTypes.array.isRequired,
  selectedTable: PropTypes.string.isRequired,
  setSelectedTable: PropTypes.func.isRequired,
  initialRender: PropTypes.object.isRequired,
};
