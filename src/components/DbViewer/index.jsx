import { Component } from 'react';
import { toast } from 'react-hot-toast';
import { SQLTables } from './SQLTables';
import { Editor } from './Editor';
import { QueryResult } from './QueryResult';
import { QueryError } from './QueryError';
import { SQLite } from '../../models/SQLite';
import { CommonUtils } from '../../utils/common';

export class DbViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tables: [],
      query: '',
      queryResult: [],
      loadingResult: false,
      selectedTable: '',
      error: ''
    };

    this.db = SQLite.getInstance();
  }

  componentDidMount() {
    const tables = this.db.getAllTableNames();
    const selectedTable = tables.length ? tables[0] : '';

    if (!selectedTable) {
      return;
    }

    const initialQuery = `SELECT * FROM ${selectedTable} LIMIT 10`;
    this.setState({ tables, selectedTable, query: initialQuery });
    this.peekTable(selectedTable);
  }

  peekTable = selectedTable => {
    const result = this.db.peekTable(selectedTable);
    this.setQueryResult(result);
  };

  executeQuery = () => {
    this.setState({ loadingResult: true });

    const { query } = this.state;

    console.log(query);
    const result = this.db.runQuery(query);

    this.setQueryResult(result);

    if (result.length && result[0].values.length > 50) {
      toast.error(
        'This query returned more than 50 rows. Consider adding a limit clause.',
        {
          position: 'top-right'
        }
      );
    }
  };

  setQuery = query => {
    this.setState({
      query,
      selectedTable: ''
    });

    toast.dismiss();
  };

  setQueryResult = queryResult => {
    if (CommonUtils.isEmpty(queryResult)) {
      this.setState({ loadingResult: false });
    } else if (queryResult.error) {
      this.setState({
        queryResult: [],
        loadingResult: false,
        error: queryResult.error
      });
    } else {
      this.setState({
        queryResult,
        loadingResult: false,
        error: ''
      });
    }
  };

  setSelectedTable = selectedTable => {
    const updatedQuery = `SELECT * FROM ${selectedTable} LIMIT 10`;
    this.setState({ selectedTable, query: updatedQuery });
  };

  render() {
    const { tables, query, queryResult, loadingResult, selectedTable, error } =
      this.state;
    return (
      <div className="p-2">
        <div className="container">
          <div className="row">
            <SQLTables
              tables={tables}
              selectedTable={selectedTable}
              setSelectedTable={this.setSelectedTable}
            />
          </div>
          <div className="row my-4">
            <div className="col-6">
              <Editor
                query={query}
                setQuery={this.setQuery}
                executeQuery={this.executeQuery}
              />
            </div>
            <div className="col-6">
              {queryResult.length && !error ? (
                <QueryResult
                  loadingResult={loadingResult}
                  queryResult={queryResult}
                  setQueryResult={this.setQueryResult}
                />
              ) : (
                <QueryError error={error} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
