import { Component } from 'react';
import PropTypes from 'prop-types';
import { PreviousQueryItem } from './PreviousQueryItem';

export class PreviousQueries extends Component {
  render() {
    const {
      queryHistory,
      setQuery,
      query: editorContents,
      persistHistory,
      clearHistory,
      deleteQueryFromHistory
    } = this.props;
    return (
      <div className="my-3">
        <div
          className="d-flex justify-content-between align-items-center px-2"
          style={{ width: 410 }}
        >
          <h3 className="my-2">History</h3>
          <div>
            <button className="btn btn-secondary mx-2" onClick={persistHistory}>
              Persist History
            </button>
            <button className="btn btn-danger" onClick={clearHistory}>
              Clear History
            </button>
          </div>
        </div>
        <div className="overflow-scroll" style={{ height: 700 }}>
          {queryHistory.map(query => (
            <PreviousQueryItem
              key={query}
              query={query}
              setQuery={setQuery}
              editorContents={editorContents}
              deleteQueryFromHistory={deleteQueryFromHistory}
            />
          ))}
        </div>
      </div>
    );
  }
}

PreviousQueries.propTypes = {
  queryHistory: PropTypes.array.isRequired,
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  persistHistory: PropTypes.func.isRequired,
  clearHistory: PropTypes.func.isRequired,
  deleteQueryFromHistory: PropTypes.func.isRequired
};
