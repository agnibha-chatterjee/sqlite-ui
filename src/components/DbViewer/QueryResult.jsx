import { Component } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import PropTypes from 'prop-types';
import { transformQueryResult } from '../../utils/transform';

export class QueryResult extends Component {
  render() {
    const { queryResult, loadingResult, queryMessage } = this.props;

    const res = queryResult.length
      ? queryResult[0]
      : { columns: [], values: [] };

    return (
      <div>
        <h5 className="my-2">Result</h5>
        <div style={{ overflow: 'scroll', height: 600 }}>
          {loadingResult ? (
            <div>Fetching results...</div>
          ) : (
            <>
              {queryMessage === 'select' ? (
                <>
                  {queryResult.length ? (
                    <div className="table-responsive">
                      <TableVirtuoso
                        style={{ height: 600 }}
                        data={transformQueryResult(res)}
                        totalCount={res.values.length}
                        components={{
                          // eslint-disable-next-line react/prop-types
                          Table: ({ children }) => {
                            return (
                              <table className="table table-striped table-hover table-bordered">
                                {children}
                              </table>
                            );
                          }
                        }}
                        fixedHeaderContent={() => (
                          <tr>
                            {res.columns.map(col => (
                              <th key={col + Math.random()}>{col}</th>
                            ))}
                          </tr>
                        )}
                        itemContent={(index, data) => (
                          <>
                            {res.columns.map(col => (
                              <td key={data[col] + Math.random()}>
                                {data[col]}
                              </td>
                            ))}
                          </>
                        )}
                      />
                    </div>
                  ) : (
                    <div>This query returned no results</div>
                  )}
                </>
              ) : (
                <div className="alert alert-success">
                  <p>{queryMessage}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

QueryResult.propTypes = {
  queryResult: PropTypes.array.isRequired,
  loadingResult: PropTypes.bool.isRequired,
  queryMessage: PropTypes.string.isRequired
};
