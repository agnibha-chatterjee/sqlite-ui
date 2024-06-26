import PropTypes from "prop-types";
import { PreviousQueryItem } from "./PreviousQueryItem";

export const PreviousQueries = ({
  queryHistory,
  setQuery,
  query: editorContents,
  clearHistory,
  deleteQueryFromHistory,
  persistHistory,
}) => {
  return (
    <div className="my-3">
      <div
        className="d-flex justify-content-between align-items-center px-2"
        style={{ width: 360 }}
      >
        <h5 className="my-2">History</h5>
        <div>
          <button
            data-cy="persist-history"
            className="btn btn-secondary btn-sm mx-2"
            onClick={persistHistory}
          >
            Persist History
          </button>
          <button
            data-cy="clear-history"
            className="btn btn-danger btn-sm"
            onClick={clearHistory}
          >
            Clear History
          </button>
        </div>
      </div>
      <div
        className="overflow-scroll"
        style={{ height: 700 }}
        data-cy="previous-queries-container"
      >
        {queryHistory.map((query) => (
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
};

PreviousQueries.propTypes = {
  queryHistory: PropTypes.array.isRequired,
  setQuery: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  clearHistory: PropTypes.func.isRequired,
  deleteQueryFromHistory: PropTypes.func.isRequired,
  persistHistory: PropTypes.func.isRequired,
};
