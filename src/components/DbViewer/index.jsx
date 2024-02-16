import { Component } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { SQLTables } from './SQLTables';
import { Editor } from './Editor';
import { QueryResult } from './QueryResult';
import { QueryError } from './QueryError';
import { PreviousQueries } from './PreviousQueries';
import { CommonUtils } from '../../utils/common';
import { QueryHistory } from '../../models/QueryHistory';
import { SQLite } from '../../models/SQLite';

export class DbViewer extends Component {
  constructor(props) {
    super(props);

    const fileName = props.files[0].name;

    this.queryHistory = new QueryHistory(fileName);
    this.db = SQLite.getInstance();

    this.state = {
      tables: [],
      queryResult: [],
      query: '',
      selectedQuery: '',
      selectedLineText: '',
      selectedTable: '',
      queryError: '',
      queryMessage: '',
      loadingResult: false,
      queryHistory: this.queryHistory.getHistory()
    };
  }

  componentDidMount() {
    const tables = this.db.getAllTableNames();
    const selectedTable = tables.length ? tables[0] : '';

    if (!selectedTable) {
      return;
    }

    const initialQuery = `SELECT * FROM ${selectedTable} LIMIT 10;`;
    this.setState({ tables, selectedTable, query: initialQuery });
    this.peekTable(selectedTable);
  }

  peekTable = selectedTable => {
    const result = this.db.peekTable(selectedTable);
    this.setQueryResult(result);
  };

  setQueryResultWrapperAndShowToast = result => {
    this.setQueryResult(result);

    const { data = [] } = result;

    if (data.length && data[0].values.length > 50) {
      toast.error(
        'This query returned more than 50 rows. Consider adding a limit.'
      );
    }
  };

  executeQuery = () => {
    this.setState({ loadingResult: true, queryError: '' });

    const { query, selectedQuery, selectedLineText } = this.state;

    const isThereAnyLineText = selectedLineText.trim().length > 0;

    if (isThereAnyLineText) {
      const result = this.db.runQuery(selectedLineText);
      if (!result.error) {
        this.addToQueryHistory(selectedLineText);
        this.setQueryResultWrapperAndShowToast(result);
        return;
      }
    }

    const isAnyTextSelected = selectedQuery.trim().length > 0;
    this.addToQueryHistory(isAnyTextSelected ? selectedQuery : query);
    const result = this.db.runQuery(isAnyTextSelected ? selectedQuery : query);

    this.setQueryResultWrapperAndShowToast(result);
  };

  setQuery = query => {
    this.setState({
      query,
      selectedTable: ''
    });

    toast.dismiss();
  };

  setQueryResult = queryResult => {
    const { message: queryMessage = '', data = [], error = '' } = queryResult;

    const commonState = {
      loadingResult: false,
      queryMessage
    };

    if (error.trim().length) {
      this.setState({
        ...commonState,
        queryResult: [],
        queryError: error
      });

      return;
    }

    if (CommonUtils.isEmpty(data) && queryMessage !== 'select') {
      const { tables: oldTables } = this.state;
      let newTables = [];
      if (queryMessage.includes('created table')) {
        newTables = this.db.getAllTableNames();
      }

      this.setState({
        ...commonState,
        tables: newTables.length ? newTables : oldTables
      });

      return;
    }

    if (CommonUtils.isEmpty(data)) {
      this.setState({ ...commonState, queryResult: [] });
      return;
    }

    this.setState({
      ...commonState,
      queryResult: data
    });
  };

  setSelectedTable = selectedTable => {
    const updatedQuery = `SELECT * FROM ${selectedTable} LIMIT 10;`;
    this.setState({ selectedTable, query: updatedQuery });
  };

  setSelectedQuery = selectedQuery => {
    this.setState({ selectedQuery });
  };

  setSelectedLine = selectedLineText => {
    this.setState({ selectedLineText });
  };

  addToQueryHistory = query => {
    this.queryHistory.addQuery(query);
    this.setState({ queryHistory: this.queryHistory.getHistory() });
  };

  persistHistory = () => {
    this.queryHistory.persistHistory();
    toast.success('Query history persisted to local storage');
  };

  clearHistory = () => {
    this.queryHistory.clearHistory();
    this.setState({ queryHistory: this.queryHistory.getHistory() });
    toast.success('Query history cleared and persisted storage was purged');
  };

  deleteQueryFromHistory = query => {
    this.queryHistory.deleteQuery(query);
    this.setState({ queryHistory: this.queryHistory.getHistory() });
  };

  render() {
    const {
      tables,
      query,
      queryResult,
      loadingResult,
      selectedTable,
      queryError,
      queryMessage,
      queryHistory
    } = this.state;
    return (
      <div className="d-flex flex-column flex-lg-row p-1 mt-5">
        <div className="col-lg-auto bg-light rounded-2 mb-3 mb-lg-0 overflow-auto">
          <PreviousQueries
            queryHistory={queryHistory}
            setQuery={this.setQuery}
            query={query}
            persistHistory={this.persistHistory}
            clearHistory={this.clearHistory}
            deleteQueryFromHistory={this.deleteQueryFromHistory}
          />
        </div>
        <div className="flex-grow-1 overflow-auto">
          <div className="container-fluid">
            <div className="row">
              <SQLTables
                tables={tables}
                selectedTable={selectedTable}
                setSelectedTable={this.setSelectedTable}
              />
            </div>
            <div className="row my-4">
              <div className="col-md-6">
                <Editor
                  query={query}
                  setQuery={this.setQuery}
                  executeQuery={this.executeQuery}
                  setSelectedQuery={this.setSelectedQuery}
                  setSelectedLine={this.setSelectedLine}
                />
              </div>
              <div className="col-md-6">
                {queryError ? (
                  <QueryError error={queryError} />
                ) : (
                  <QueryResult
                    loadingResult={loadingResult}
                    queryResult={queryResult}
                    setQueryResult={this.setQueryResult}
                    queryMessage={queryMessage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DbViewer.propTypes = {
  files: PropTypes.array.isRequired
};
