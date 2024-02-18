import { QueryHistory } from './QueryHistory';
import { SQLite } from './SQLite';

export class DatabaseManager {
  static instance;

  constructor(fileName) {
    this.db = SQLite.getInstance();
    this.qh = new QueryHistory(fileName);
  }

  static getInstance(fileName) {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager(fileName);
    }

    return DatabaseManager.instance;
  }

  queryHistory() {
    return this.qh;
  }

  database() {
    return this.db;
  }
}
