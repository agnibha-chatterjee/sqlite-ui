import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { FileUpload } from './components/FileUpload';
import { DbViewer } from './components/DbViewer';
import { Tips } from './components/Tips';
import { DatabaseManager } from './models/DatabaseManager';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      dbLoaded: false
    };
  }

  onDrop = async files => {
    const fileName = files[0].name;
    const dm = DatabaseManager.getInstance(fileName);
    const loaded = await dm.database().loadDbFromFile(files);

    if (loaded) {
      this.setState({
        files,
        dbLoaded: loaded
      });
    } else {
      // retrying
      this.onDrop(files);
    }
  };

  loadSampleDb = async () => {
    const fileName = 'sample.db';
    const dm = DatabaseManager.getInstance(fileName);
    const loaded = await dm.database().loadDbFromUrl('/sample.db');

    if (loaded) {
      this.setState({
        files: [{ name: 'sample.db' }],
        dbLoaded: loaded
      });
    } else {
      //retrying
      this.loadSampleDb();
    }
  };

  render() {
    const { files, dbLoaded } = this.state;
    return (
      <div className="py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">SQLite UI</h1>
          <p className="col-12 fs-4">A DB viewer for SQLite databases.</p>
          <button
            type="button"
            className="btn btn-link"
            data-bs-toggle="modal"
            data-bs-target="#tips-modal"
          >
            Some helpful tips (recommended if {"you're"} new to SQLite UI)
          </button>
        </div>
        <Tips />
        <div className="container-fluid">
          <div key={JSON.stringify(files)}>
            <div>
              <FileUpload files={files} onDrop={this.onDrop} />
              <button
                className="btn btn-link text-center w-100"
                onClick={this.loadSampleDb}
              >
                Or test the app with a sample sqlite db
              </button>
            </div>
            {!!files.length && dbLoaded && <DbViewer files={files} />}
          </div>
        </div>
        <Toaster />
      </div>
    );
  }
}

export default App;
