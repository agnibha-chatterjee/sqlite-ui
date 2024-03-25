import { Parser } from 'node-sql-parser';

export const getMessageForTypeOfQuery = (formattedQuery) => {
  const parser = new Parser();
  const ast = parser.astify(formattedQuery);
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
      return `Successfully deleted from ${dbTable}`;
    case 'create':
      return `Successfully created ${keyword} ${dbTable}`;
    default:
      return 'select';
  }
};
