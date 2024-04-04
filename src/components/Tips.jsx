export const Tips = () => {
  return (
    <div
      id="tips-modal"
      className="modal overflow-hidden"
      tabIndex="-1"
      data-cy="tips-modal"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Some helpful tips</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              data-cy="close-tips"
            ></button>
          </div>
          <div className="modal-body">
            <h6 className="fw-bold">Three ways to run queries</h6>
            <ol>
              <li>
                The regular way of typing in your query and clicking the
                {' "Run" '}
                button.
              </li>
              <li>
                <div>
                  <p>
                    Selecting a piece of text in the SQL editor and clicking the
                    {' "Run" '} button.
                  </p>
                  <p>
                    <img
                      src="/images/selection.png"
                      alt="selection-pic"
                      width={1000}
                    />
                  </p>
                </div>
              </li>
              <li>
                <div>
                  <p>
                    Placing your cursor at the end of a line and pressing the{" "}
                    {' "Run" '} button to run that line as a query.
                  </p>
                  <p>
                    <img
                      src="/images/line-ex.png"
                      alt="line-ex-pic"
                      width={1000}
                    />
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
