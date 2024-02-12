import { Component } from 'react';
import PropTypes from 'prop-types';

export class QueryError extends Component {
  render() {
    const { error } = this.props;
    return (
      <div>
        <h3 className="my-2">Error</h3>
        <div style={{ height: 600 }}>
          <div className="alert alert-danger">
            <p>Uh-oh! There seems to be an issue with your query</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }
}

QueryError.propTypes = {
  error: PropTypes.string.isRequired
};
