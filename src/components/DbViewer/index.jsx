import { toast } from "react-hot-toast";
import { SQLTables } from "./SQLTables";
import { Editor } from "./Editor";
import { QueryResult } from "./QueryResult";
import { QueryError } from "./QueryError";
import { PreviousQueries } from "./PreviousQueries";
import { isEmpty } from "../../utils/common";
import { DatabaseManager } from "../../models/DatabaseManager";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const DbViewer = ({ files }) => {
  const fileName = files[0].name;
  const dm = DatabaseManager(fileName);

  const db = dm.database();
  const queryHistory = dm.queryHistory();

  const [tables, setTables] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [selectedLineText, setSelectedLineText] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [queryError, setQueryError] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  const [loadingResult, setLoadingResult] = useState(false);
  const [queryHistoryState, setQueryHistoryState] = useState(
    queryHistory.getHistory()
  );

  useEffect(() => {
    const tables = db.getAllTableNames();
    const selectedTable = tables.length ? tables[0] : "";

    if (!selectedTable) {
      return;
    }

    const initialQuery = `SELECT * FROM ${selectedTable} LIMIT 10;`;
    setTables(tables);
    setSelectedTable(selectedTable);
    setQuery(initialQuery);
    peekTable(selectedTable);
  }, []);

  const peekTable = (selectedTable) => {
    const result = db.peekTable(selectedTable);
    setQueryResultHandler(result);
  };

  const setQueryResultHandler = (result) => {
    const { message: queryMessage = "", data = [], error = "" } = result;

    if (error.trim().length) {
      setQueryResult([]);
      setQueryError(error);
      setLoadingResult(false);
      setQueryMessage(queryMessage);
      return;
    }

    if (isEmpty(data) && queryMessage !== "select") {
      let newTables = [];
      if (queryMessage.includes("created table")) {
        newTables = db.getAllTableNames();
      }

      setTables(newTables.length ? newTables : tables);
      setLoadingResult(false);
      setQueryMessage(queryMessage);
      return;
    }

    if (isEmpty(data)) {
      setQueryResult([]);
      setLoadingResult(false);
      setQueryMessage(queryMessage);
      return;
    }

    setQueryResult(data);
    setLoadingResult(false);
    setQueryMessage(queryMessage);
  };

  const executeQuery = () => {
    setLoadingResult(true);
    setQueryError("");

    const isThereAnyLineText = selectedLineText.trim().length > 0;

    if (isThereAnyLineText) {
      const result = db.runQuery(selectedLineText);
      if (!result.error) {
        addToQueryHistory(selectedLineText);
        setQueryResultHandler(result);
        return;
      }
    }

    const isAnyTextSelected = selectedQuery.trim().length > 0;
    addToQueryHistory(isAnyTextSelected ? selectedQuery : query);
    const result = db.runQuery(isAnyTextSelected ? selectedQuery : query);

    setQueryResultHandler(result);
  };

  const addToQueryHistory = (query) => {
    queryHistory.addQuery(query);
    setQueryHistoryState(queryHistory.getHistory());
  };

  const persistHistory = () => {
    queryHistory.persistHistory();
    toast.success("Query history persisted to local storage");
  };

  const clearHistory = () => {
    queryHistory.clearHistory();
    setQueryHistoryState(queryHistory.getHistory());
    toast.success("Query history cleared and persisted storage was purged");
  };

  const deleteQueryFromHistory = (query) => {
    queryHistory.deleteQuery(query);
    setQueryHistoryState(queryHistory.getHistory());
  };

  return (
    <div className="d-flex flex-column flex-lg-row p-1 mt-5">
      <div className="col-lg-auto bg-light rounded-2 mb-3 mb-lg-0 overflow-auto">
        <PreviousQueries
          queryHistory={queryHistoryState}
          setQuery={setQuery}
          query={query}
          persistHistory={persistHistory}
          clearHistory={clearHistory}
          deleteQueryFromHistory={deleteQueryFromHistory}
        />
      </div>
      <div className="flex-grow-1 overflow-auto">
        <div className="container-fluid">
          <div className="row">
            <SQLTables
              tables={tables}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
            />
          </div>
          <div className="row my-4">
            <div className="col-md-6">
              <Editor
                query={query}
                setQuery={setQuery}
                executeQuery={executeQuery}
                setSelectedQuery={setSelectedQuery}
                setSelectedLine={setSelectedLineText}
              />
            </div>
            <div className="col-md-6">
              {queryError ? (
                <QueryError error={queryError} />
              ) : (
                <QueryResult
                  loadingResult={loadingResult}
                  queryResult={queryResult}
                  queryMessage={queryMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DbViewer.propTypes = {
  files: PropTypes.array.isRequired,
};
