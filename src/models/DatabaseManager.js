import { QueryHistory } from "./QueryHistory";
import { getSQLiteInstance } from "./SQLite";

export const DatabaseManager = (fileName) => {
  const db = getSQLiteInstance();
  const qh = QueryHistory(fileName);

  const getDb = async () => {
    await db.initializeSqlJs();
    return db;
  };

  const self = {
    queryHistory: () => qh,
    database: async () => {
      const temp = await getDb();
      return temp;
    },
  };

  return self;
};
