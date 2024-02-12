import { Component } from 'react';
import PropTypes from 'prop-types';

export class QueryResult extends Component {
  render() {
    const { queryResult, loadingResult } = this.props;
    const res = queryResult.length
      ? queryResult[0]
      : { columns: [], values: [] };

    return (
      <div>
        <h3 className="my-2">Query Result</h3>
        <div style={{ overflow: 'scroll', height: 600 }}>
          {loadingResult ? (
            <div>Fetching results...</div>
          ) : (
            <>
              {queryResult.length ? (
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        {res.columns.map(col => (
                          <th key={col}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {res.values.map(row => (
                        <tr key={JSON.stringify(row)}>
                          {row.map((col, i) => (
                            <td key={col + i + Math.random()}>{col}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>No Results</div>
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
  loadingResult: PropTypes.bool.isRequired
};
