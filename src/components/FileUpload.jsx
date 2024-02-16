import { Component } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

export class FileUpload extends Component {
  baseStyle = {
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

  focusedStyle = {
    borderColor: '#2196f3'
  };

  acceptStyle = {
    borderColor: '#00e676'
  };

  rejectStyle = {
    borderColor: '#ff1744'
  };

  constructor(props) {
    super(props);
  }

  render() {
    const files = this.props.files.map(file => (
      <span key={file.name}>{file.name}</span>
    ));

    return (
      <>
        <Dropzone
          onDrop={this.props.onDrop}
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
                    ...this.baseStyle,
                    ...(isFocused ? this.focusedStyle : {}),
                    ...(isDragAccept ? this.acceptStyle : {}),
                    ...(isDragReject ? this.rejectStyle : {})
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
                    {files.length ? (
                      <span className="fw-bold">{files}</span>
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
  }
}

FileUpload.propTypes = {
  files: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired
};
