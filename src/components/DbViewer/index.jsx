import { useState, useEffect } from "react";
import { SQLTables } from "./SQLTables";
import { Editor } from "./Editor";
import { QueryResult } from "./QueryResult";
import { QueryError } from "./QueryError";
import { PreviousQueries } from "./PreviousQueries";
import { isEmpty } from "../../utils/common";
import PropTypes from "prop-types";
import { useRef } from "react";
import toast from "react-hot-toast";

export const DbViewer = ({ files, databaseManager }) => {
  const fileName = files[0].name;

  const DatabaseManager = databaseManager;

  const db = DatabaseManager.db;
  const qh = DatabaseManager.queryHistory();

  const getParsedLocalHistory = () => {
    const items = qh.getHistory();

    if (!items.length) {
      const key = `queryHistory-${fileName}`;
      const localStorageObject = localStorage.getItem(key);
      if (localStorageObject) {
        return JSON.parse(localStorageObject);
      }

      return [];
    }

    return items;
  };

  const [loaded, setIsLoaded] = useState(false);
  const [tables, setTables] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");
  const [selectedLineText, setSelectedLineText] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [queryError, setQueryError] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  const [loadingResult, setLoadingResult] = useState(false);
  const [queryHistory, setQueryHistory] = useState(getParsedLocalHistory());
  const initialRender = useRef(0);

  console.log("Line", selectedLineText);
  console.log("selected", selectedQuery);

  useEffect(() => {
    if (!isEmpty(db)) {
      setIsLoaded(true);
    }
  }, []);

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

    initialRender.current++;
  }, []);

  useEffect(() => {
    if (initialRender.current <= 2) {
      return;
    }
    const updatedQuery = `\nSELECT * FROM ${selectedTable} LIMIT 10;`;
    setQuery((prevQuery) => prevQuery + updatedQuery);
  }, [selectedTable]);

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
    console.log(db);
    const result = db.runQuery(isAnyTextSelected ? selectedQuery : query);
    console.log(result);
    setQueryResultHandler(result);
  };

  const addToQueryHistory = (query) => {
    setQueryHistory((prevHistory) => {
      const newHistory = [...new Set([query, ...prevHistory])];
      return newHistory;
    });
  };

  const persistHistory = () => {
    const localStorageKey = `queryHistory-${fileName}`;
    localStorage.setItem(localStorageKey, JSON.stringify(queryHistory));
    toast.success("Query history persisted to local storage");
  };

  const clearHistory = () => {
    setQueryHistory([]);
    const localStorageKey = `queryHistory-${fileName}`;
    localStorage.clear(localStorageKey);
    toast.success("Query history cleared and persisted storage was purged");
  };

  const deleteQueryFromHistory = (query) => {
    setQueryHistory((prevHistory) => {
      const newHistory = prevHistory.filter((q) => q !== query);
      return newHistory;
    });
  };

  return loaded ? (
    <div className="d-flex flex-column flex-lg-row p-1 mt-5">
      <div className="col-lg-auto bg-light rounded-2 mb-3 mb-lg-0 overflow-auto">
        <PreviousQueries
          queryHistory={queryHistory}
          setQuery={setQuery}
          query={query}
          clearHistory={clearHistory}
          deleteQuery
          deleteQueryFromHistory={deleteQueryFromHistory}
          persistHistory={persistHistory}
        />
      </div>
      <div className="flex-grow-1 overflow-auto">
        <div className="container-fluid">
          <div className="row">
            <SQLTables
              tables={tables}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
              initialRender={initialRender}
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
  ) : (
    <div>Error parsing database file</div>
  );
};

DbViewer.propTypes = {
  files: PropTypes.array.isRequired,
  databaseManager: PropTypes.object.isRequired,
};
