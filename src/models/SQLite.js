import initSqlJs from 'sql.js';
import SqlString from 'sqlstring';
import { QueryParser } from '../utils/query-parser';

export class SQLite {
  static instance;

  constructor() {
    this.database = null;
    this.SQL = null;
    this.initializeSqlJs();
  }

  static getInstance() {
    if (!SQLite.instance) {
      SQLite.instance = new SQLite();
    }

    return SQLite.instance;
  }

  get db() {
    if (!this.database) {
      throw new Error('Database not loaded');
    }

    return this.database;
  }

  initializeSqlJs = async () => {
    this.SQL = await initSqlJs({
      locateFile: () => `/sql-wasm.wasm`
    });
  };

  loadFile = async file => {
    try {
      const buffer = await file.arrayBuffer();
      const uInt8Array = new Uint8Array(buffer);
      this.database = new this.SQL.Database(uInt8Array);
      return true;
    } catch (error) {
      return false;
    }
  };

  loadDbFromFile = async files => {
    try {
      const file = files[0];
      return await this.loadFile(file);
    } catch {
      return false;
    }
  };

  loadDbFromUrl = async url => {
    try {
      const file = await fetch(url);
      return await this.loadFile(file);
    } catch {
      return false;
    }
  };

  getAllTableNames = () => {
    const allTables = [];
    const tables = this.db.prepare(
      'SELECT name FROM sqlite_master WHERE type="table";'
    );

    while (tables.step()) {
      const [name] = tables.get();
      allTables.push(name);
    }

    tables.free();

    return allTables.filter(name => !name.startsWith('sqlite_'));
  };

  runQuery = query => {
    try {
      const formattedQuery = SqlString.format(query) + ';';
      const queryResult = this.db.exec(formattedQuery);
      const message = QueryParser.getMessageForTypeOfQuery(formattedQuery);
      return { message, data: queryResult };
    } catch (error) {
      return { error: error.message };
    }
  };

  peekTable = tableName => {
    return this.runQuery(`SELECT * FROM ${tableName} LIMIT 10;`);
  };
}
