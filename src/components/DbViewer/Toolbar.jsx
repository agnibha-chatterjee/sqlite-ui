import { Component } from 'react';

export class Toolbar extends Component {
  fontSizes = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  render() {
    return (
      <div className="d-flex">
        <div className="d-flex justify-content-start align-items-start mt-2">
          <div className="form-check form-switch me-2 bg-light-tertiary">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="word-wrap"
            />
            <label className="form-check-label" htmlFor="word-wrap">
              Word Wrap
            </label>
          </div>
        </div>

        <div className="me-2">
          <button
            type="button"
            className="btn btn-light dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Font size
          </button>
          <ul className="dropdown-menu">
            {this.fontSizes.map(size => (
              <li key={size}>
                <span className="dropdown-item">{size}px</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button type="button" className="btn btn-danger mx-1">
            Clear
          </button>

          <button type="button" className="btn btn-success mx-1">
            Run
          </button>
        </div>
      </div>
    );
  }
}
