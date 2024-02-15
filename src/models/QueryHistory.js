import toast from 'react-hot-toast';
import { CommonUtils } from '../utils/common';

export class QueryHistory {
  constructor(dbName) {
    this.queryHistory = [];
    this.dbName = dbName;
    this.loadHistory();
  }

  addQuery(query) {
    this.queryHistory.push(query);
  }

  getHistory() {
    return [...new Set(this.queryHistory)] ?? [];
  }

  deleteQuery(query) {
    this.queryHistory = this.queryHistory.filter(q => q !== query);
  }

  clearHistory() {
    this.queryHistory = [];
    this.persistHistory();
  }

  persistHistory() {
    const localStorageKey = `queryHistory-${this.dbName}`;
    const localStorageObject = {};
    localStorageObject[localStorageKey] = this.queryHistory;

    localStorage.setItem(localStorageKey, JSON.stringify(localStorageObject));
  }

  loadHistory() {
    const localStorageKey = `queryHistory-${this.dbName}`;
    let localStorageObject = null;
    try {
      localStorageObject = JSON.parse(localStorage.getItem(localStorageKey));
    } catch (error) {
      console.error('Error retrieving stored queries', error);
    }

    if (!!localStorageObject && !CommonUtils.isEmpty(localStorageObject)) {
      this.queryHistory = localStorageObject[localStorageKey];
    }
  }
}
