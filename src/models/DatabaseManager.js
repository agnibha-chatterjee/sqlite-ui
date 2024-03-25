import { QueryHistory } from './QueryHistory';
import { SQLite } from './SQLite';

export const DatabaseManager = (fileName) => {
  const db = SQLite.getInstance();
  const qh = new QueryHistory(fileName);

  const self = {
    queryHistory: () => qh,
    database: () => db,
  }

  return self;
}

