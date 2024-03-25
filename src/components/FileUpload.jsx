import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

export const FileUpload = ({ files, onDrop }) => {
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: '100%'
  };

  const focusedStyle = {
    borderColor: '#2196f3'
  };

  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };

  const fileList = files.map(file => (
    <span key={file.name}>{file.name}</span>
  ));

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        maxFiles={1}
        accept={{
          'application/x-sqlite3': ['.db', '.sqlite', '.sqlite3']
        }}
      >
        {({
          getRootProps,
          getInputProps,
          isFocused,
          isDragAccept,
          isDragReject
        }) => (
          <section className="container">
            <div
              {...getRootProps({
                style: {
                  ...baseStyle,
                  ...(isFocused ? focusedStyle : {}),
                  ...(isDragAccept ? acceptStyle : {}),
                  ...(isDragReject ? rejectStyle : {})
                }
              })}
            >
              <input {...getInputProps()} />
              <p className="mt-3">
                To get started, drag {"'n'"} drop a sqlite/sqlite3/db file
                here, or click to select one
              </p>
              <aside>
                <p>
                  Uploaded File:{' '}
                  {fileList.length ? (
                    <span className="fw-bold">{fileList}</span>
                  ) : (
                    <span className="fw-bold">None</span>
                  )}
                </p>
              </aside>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
};

FileUpload.propTypes = {
  files: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired
};

