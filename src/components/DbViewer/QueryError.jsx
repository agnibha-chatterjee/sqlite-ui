import PropTypes from 'prop-types';

export const QueryError = ({ error }) => {
  return (
    <div>
      <h5 className="my-2">Error</h5>
      <div style={{ height: 600 }}>
        <div className="alert alert-danger">
          <p>Uh-oh! There seems to be an issue with your query</p>
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

QueryError.propTypes = {
  error: PropTypes.string.isRequired
};
