import initSqlJs from 'sql.js';
import SqlString from 'sqlstring';
import { Parser } from 'node-sql-parser';

export class SQLite {
  static instance;

  constructor() {
    this.database = null;
    this.SQL = null;
    this.parser = new Parser();
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

  loadDb = async files => {
    try {
      const file = files[0];
      const buffer = await file.arrayBuffer();
      const uInt8Array = new Uint8Array(buffer);
      this.database = new this.SQL.Database(uInt8Array);
      return true;
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

  getMessageForTypeOfQuery = ast => {
    const { type = '', from = [], table = [], keyword = '' } = ast[0];
    const dbTable = from[0]?.table ?? table[0]?.table;
    switch (type) {
      case 'alter':
        return `Successfully altered ${dbTable}`;
      case 'insert':
        return `Successfully inserted into ${dbTable}`;
      case 'update':
        return `Successfully updated ${dbTable}`;
      case 'delete':
        return `Successfully deleted row(s) from ${dbTable}`;
      case 'create':
        return `Successfully created ${keyword} ${dbTable}`;
      default:
        return 'select';
    }
  };

  runQuery = query => {
    try {
      const formattedQuery = SqlString.format(query);
      const ast = this.parser.astify(formattedQuery);
      const queryResult = this.db.exec(formattedQuery);
      const message = this.getMessageForTypeOfQuery(ast);
      return { message, data: queryResult };
    } catch (error) {
      return { error: error.message };
    }
  };

  peekTable = tableName => {
    return this.runQuery(`SELECT * FROM ${tableName} LIMIT 10;`);
  };
}
