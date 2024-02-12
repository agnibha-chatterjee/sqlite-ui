import { Component } from 'react';
import PropTypes from 'prop-types';

export class SQLTables extends Component {
  render() {
    const { tables, selectedTable, setSelectedTable } = this.props;
    return (
      <div className="my-3">
        <h4 className="my-2">Database Tables</h4>
        <div className="btn-group w-100">
          {tables.map(table => (
            <button
              key={table}
              type="button"
              onClick={() => setSelectedTable(table)}
              className={`btn ${
                selectedTable === table ? 'btn-dark' : 'btn-outline-dark'
              }`}
            >
              {table}
            </button>
          ))}
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
