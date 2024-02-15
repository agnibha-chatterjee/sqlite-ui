import { Component } from 'react';
import PropTypes from 'prop-types';

export class PreviousQueryItem extends Component {
  render() {
    const { query, setQuery, editorContents, deleteQueryFromHistory } =
      this.props;
    return (
      <div className="card my-2 ms-1" style={{ maxWidth: 400 }}>
        <div className="card-body">
          <div className="card-title text-break">{query}</div>
          <button
            href="#"
            className="btn btn-primary me-2"
            onClick={() => setQuery(editorContents + `\n${query}`)}
          >
            Re-use
          </button>
          <button
            href="#"
            className="btn btn-danger"
            onClick={() => deleteQueryFromHistory(query)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

PreviousQueryItem.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  editorContents: PropTypes.string.isRequired,
  deleteQueryFromHistory: PropTypes.func.isRequired
};
