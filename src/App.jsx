import { useRef, useState } from "react";
import { FileUpload } from "./components/FileUpload";
import { DbViewer } from "./components/DbViewer";
import { Tips } from "./components/Tips";
import { DatabaseManager } from "./models/DatabaseManager";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [files, setFiles] = useState([]);
  const [dbLoaded, setDbLoaded] = useState(false);

  const databaseManagerRef = useRef(null);

  const onDrop = async (files) => {
    const fileName = files[0].name;
    const dm = DatabaseManager(fileName);
    const database = await dm.database();
    databaseManagerRef.current = {
      db: database,
      ...dm,
    };
    const loaded = await database.loadDbFromFile(files);

    if (loaded) {
      setFiles(files);
      setDbLoaded(loaded);
    } else {
      // retrying
      onDrop(files);
    }
  };

  const loadSampleDb = async () => {
    const fileName = "sample.db";
    const dm = DatabaseManager(fileName);
    databaseManagerRef.current = dm;
    const database = await dm.database();
    databaseManagerRef.current = {
      db: database,
      ...dm,
    };
    const loaded = await database.loadDbFromUrl("/sample.db");

    if (loaded) {
      setFiles([{ name: "sample.db" }]);
      setDbLoaded(loaded);
    } else {
      //retrying
      loadSampleDb();
    }
  };

  return (
    <div className="py-5">
      <Toaster />
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
            <FileUpload files={files} onDrop={onDrop} />
            <button
              className="btn btn-link text-center w-100"
              onClick={loadSampleDb}
            >
              Or test the app with a sample sqlite db
            </button>
          </div>
          {!!files.length && dbLoaded && (
            <DbViewer
              files={files}
              databaseManager={databaseManagerRef.current}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
