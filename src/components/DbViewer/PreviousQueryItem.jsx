import { Component } from 'react';
import PropTypes from 'prop-types';

export class PreviousQueryItem extends Component {
  render() {
    const { query, setQuery, editorContents, deleteQueryFromHistory } =
      this.props;
    return (
      <div className="card my-2 ms-1" style={{ maxWidth: 340 }}>
        <div className="card-body">
          <div className="card-title text-break fst-italic">{query}</div>
          <button
            href="#"
            className="btn btn-primary btn-sm me-2"
            onClick={() => setQuery(editorContents + `\n${query}`)}
          >
            Re-use
          </button>
          <button
            href="#"
            className="btn btn-danger btn-sm"
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
