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

    this.debouncedRunQuery = CommonUtils.debounce(query => {
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
    }, 1000);
  }

  componentDidMount() {
    const tables = this.db.getAllTableNames();
    const selectedTable = tables.length ? tables[0] : '';

    if (!selectedTable) {
      return;
    }

    this.setState({ tables, selectedTable });
    this.peekTable(selectedTable);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.selectedTable !== this.state.selectedTable) {
      this.peekTable(this.state.selectedTable);
    }
  }

  peekTable = selectedTable => {
    const result = this.db.peekTable(selectedTable);
    this.setQueryResult(result);
  };

  setQuery = query => {
    this.setState({
      query,
      loadingResult: true,
      selectedTable: ''
    });

    toast.dismiss();
    this.debouncedRunQuery(query);
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
    this.setState({ selectedTable });
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
                selectedTable={selectedTable}
                setQuery={this.setQuery}
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
