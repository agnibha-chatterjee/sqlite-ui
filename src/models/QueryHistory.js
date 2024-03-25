import { isEmpty } from "../utils/common";

export const QueryHistory = (dbName) => {
  let queryHistory = [];
  loadHistory();

  function addQuery(query) {
    if (!query) return;
    queryHistory.push(query);
  }

  function getHistory() {
    return [...new Set(queryHistory)] ?? [];
  }

  function deleteQuery(query) {
    queryHistory = queryHistory.filter((q) => q !== query);
  }

  function clearHistory() {
    queryHistory = [];
    persistHistory();
  }

  function persistHistory() {
    const localStorageKey = `queryHistory-${dbName}`;
    const localStorageObject = {};
    localStorageObject[localStorageKey] = queryHistory;

    localStorage.setItem(localStorageKey, JSON.stringify(localStorageObject));
  }

  function loadHistory() {
    const localStorageKey = `queryHistory-${dbName}`;
    let localStorageObject = null;
    try {
      localStorageObject = JSON.parse(localStorage.getItem(localStorageKey));
    } catch (error) {
      console.error("Error retrieving stored queries", error);
    }

    if (!!localStorageObject && !isEmpty(localStorageObject)) {
      queryHistory = localStorageObject[localStorageKey];
    }
  }

  const self = {
    addQuery,
    getHistory,
    deleteQuery,
    clearHistory,
    persistHistory,
  };

  return self;
};
