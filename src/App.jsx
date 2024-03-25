import { useState, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { FileUpload } from "./components/FileUpload";
import { DbViewer } from "./components/DbViewer";
import { Tips } from "./components/Tips";
import { DatabaseManager } from "./models/DatabaseManager";

const App = () => {
  const [files, setFiles] = useState([]);
  const [dbLoaded, setDbLoaded] = useState(false);

  const onDrop = useCallback(async (files) => {
    const fileName = files[0].name;
    const dm = DatabaseManager(fileName);
    const loaded = await dm.database().loadDbFromFile(files);

    if (loaded) {
      setFiles(files);
      setDbLoaded(loaded);
    } else {
      // retrying
      onDrop(files);
    }
  }, []);

  const loadSampleDb = useCallback(async () => {
    const fileName = "sample.db";
    const dm = DatabaseManager(fileName);
    const loaded = await dm.database().loadDbFromUrl("/sample.db");

    if (loaded) {
      setFiles([{ name: "sample.db" }]);
      setDbLoaded(loaded);
    } else {
      //retrying
      loadSampleDb();
    }
  }, []);

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
            <FileUpload files={files} onDrop={onDrop} />
            <button
              className="btn btn-link text-center w-100"
              onClick={loadSampleDb}
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
};

export default App;
