import { Component } from 'react';
import PropTypes from 'prop-types';

export class SQLTables extends Component {
  render() {
    const { tables, selectedTable, setSelectedTable } = this.props;
    return (
      <div>
        <h5 className="my-2">Database Tables ({tables.length} in total)</h5>
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-outline-dark dropdown-toggle w-100"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Selected table: {selectedTable}
          </button>
          <ul className="dropdown-menu w-100">
            {tables.map(table => (
              <li
                key={table}
                onClick={() => setSelectedTable(table)}
                className="w-100"
              >
                <span
                  className={`dropdown-item ${
                    selectedTable === table && 'bg-dark text-light'
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
  }
}

SQLTables.propTypes = {
  tables: PropTypes.array.isRequired,
  selectedTable: PropTypes.string.isRequired,
  setSelectedTable: PropTypes.func.isRequired
};
