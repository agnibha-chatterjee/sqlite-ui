import PropTypes from 'prop-types';

export const PreviousQueryItem = ({ query, setQuery, editorContents, deleteQueryFromHistory }) => {
  return (
    <div className="card my-2 ms-1" style={{ maxWidth: 340 }}>
      <div className="card-body">
        <div className="card-title text-break fst-italic">{query}</div>
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={() => setQuery(editorContents + `\n${query}`)}
        >
          Re-use
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteQueryFromHistory(query)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

PreviousQueryItem.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  editorContents: PropTypes.string.isRequired,
  deleteQueryFromHistory: PropTypes.func.isRequired
};
