import initSqlJs from "sql.js";
import SqlString from "sqlstring";
import { getMessageForTypeOfQuery } from "../utils/query-parser";

// This had to be an IIFE to avoid the use of global variables
const createSQLite = (() => {
  let instance;
  let database = null;
  let SQL = null;

  const initializeSqlJs = async () => {
    SQL = await initSqlJs({
      locateFile: () => `/sql-wasm.wasm`,
    });
  };

  const loadFile = async (file) => {
    try {
      const buffer = await file.arrayBuffer();
      const uInt8Array = new Uint8Array(buffer);
      database = new SQL.Database(uInt8Array);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getDb = () => {
    if (!database) {
      throw new Error("Database not loaded");
    }

    return database;
  };

  return () => {
    if (!instance) {
      instance = {
        initializeSqlJs,
        loadDbFromFile: async (files) => {
          try {
            const file = files[0];
            return await loadFile(file);
          } catch {
            return false;
          }
        },
        loadDbFromUrl: async (url) => {
          try {
            const file = await fetch(url);
            return await loadFile(file);
          } catch {
            return false;
          }
        },
        getAllTableNames: () => {
          const allTables = [];
          const tables = getDb().prepare(
            'SELECT name FROM sqlite_master WHERE type="table";'
          );

          while (tables.step()) {
            const [name] = tables.get();
            allTables.push(name);
          }

          tables.free();

          return allTables.filter((name) => !name.startsWith("sqlite_"));
        },
        runQuery: (query) => {
          try {
            const formattedQuery = SqlString.format(query) + ";";
            const queryResult = getDb().exec(formattedQuery);
            const message = getMessageForTypeOfQuery(formattedQuery);
            return { message, data: queryResult };
          } catch (error) {
            return { error: error.message };
          }
        },
        peekTable: (tableName) => {
          return instance.runQuery(`SELECT * FROM ${tableName} LIMIT 10;`);
        },
      };
    }

    return instance;
  };
})();

export const getSQLiteInstance = createSQLite;
