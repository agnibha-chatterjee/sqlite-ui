import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { FileUpload } from './components/FileUpload';
import { DbViewer } from './components/DbViewer';
import { SQLite } from './models/SQLite';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      dbLoaded: false
    };
    this.SQLite = SQLite.getInstance();
  }

  onDrop = async files => {
    const loaded = await this.SQLite.loadDb(files);

    this.setState({
      files,
      dbLoaded: loaded
    });
  };

  render() {
    const { files, dbLoaded } = this.state;

    return (
      <div className="py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">SQLite UI</h1>
          <p className="col-md-12 fs-4">A DB viewer for SQLite databases.</p>
        </div>
        <div className="container-fluid">
          <div key={JSON.stringify(files)}>
            <FileUpload files={files} onDrop={this.onDrop} />
            {!!files.length && dbLoaded && <DbViewer files={files} />}
          </div>
        </div>
        <Toaster />
      </div>
    );
  }
}

export default App;
