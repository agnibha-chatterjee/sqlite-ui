import { Component } from 'react';
import MonacoEditor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import { Toolbar } from './Toolbar';
import { debounce } from '../../utils/common';

export class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: 18,
      wordWrap: 'on'
    };

    this.debouncedSetSelectedQuery = debounce(selectedQuery => {
      this.props.setSelectedQuery(selectedQuery);
    }, 150);

    this.debouncedSetSelectedLine = debounce(lineContents => {
      this.props.setSelectedLine(lineContents);
    }, 150);
  }

  setFontSize = fontSize => {
    this.setState({ fontSize });
  };

  setWordWrap = wordWrap => {
    this.setState({ wordWrap });
  };

  render() {
    const { query, setQuery, executeQuery } = this.props;
    const { fontSize, wordWrap } = this.state;

    const handleEditorDidMount = editor => {
      editor.onDidChangeCursorPosition(e => {
        const selectedText = editor
          .getModel()
          .getValueInRange(editor.getSelection());

        const { position: { lineNumber } = {} } = e;
        const lineText = editor.getModel().getLineContent(lineNumber);

        this.debouncedSetSelectedLine(lineText);
        this.debouncedSetSelectedQuery(selectedText);
      });
    };

    return (
      <div style={{ height: '100%' }}>
        <div className="d-flex justify-content-between">
          <h5 className="my-2">Editor</h5>
          <Toolbar
            fontSize={fontSize}
            wordWrap={wordWrap}
            executeQuery={executeQuery}
            setQuery={setQuery}
            setFontSize={this.setFontSize}
            setWordWrap={this.setWordWrap}
          />
        </div>
        <MonacoEditor
          height={600}
          defaultLanguage="sql"
          value={query}
          onMount={handleEditorDidMount}
          onChange={value => setQuery(value)}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize,
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: 'on',
            accessibilitySupport: 'auto',
            autoIndent: false,
            automaticLayout: true,
            codeLens: true,
            colorDecorators: true,
            contextmenu: true,
            cursorBlinking: 'blink',
            cursorSmoothCaretAnimation: false,
            cursorStyle: 'line',
            disableLayerHinting: false,
            disableMonospaceOptimizations: false,
            dragAndDrop: false,
            fixedOverflowWidgets: false,
            folding: true,
            foldingStrategy: 'auto',
            fontLigatures: false,
            formatOnPaste: false,
            formatOnType: false,
            hideCursorInOverviewRuler: false,
            highlightActiveIndentGuide: true,
            links: true,
            mouseWheelZoom: false,
            multiCursorMergeOverlapping: true,
            multiCursorModifier: 'alt',
            overviewRulerBorder: true,
            overviewRulerLanes: 2,
            quickSuggestions: true,
            quickSuggestionsDelay: 100,
            readOnly: false,
            renderControlCharacters: false,
            renderFinalNewline: true,
            renderIndentGuides: true,
            renderLineHighlight: 'all',
            renderWhitespace: 'none',
            revealHorizontalRightPadding: 30,
            roundedSelection: true,
            rulers: [],
            scrollBeyondLastColumn: 5,
            scrollBeyondLastLine: true,
            selectOnLineNumbers: true,
            selectionClipboard: true,
            selectionHighlight: true,
            showFoldingControls: 'mouseover',
            smoothScrolling: false,
            suggestOnTriggerCharacters: true,
            wordBasedSuggestions: true,
            wordSeparators: '~!@#$%^&*()-=+[{]}|;:\'",.<>/?',
            wordWrap,
            wordWrapBreakAfterCharacters: '\t})]?|&,;',
            wordWrapBreakBeforeCharacters: '{([+',
            wordWrapBreakObtrusiveCharacters: '.',
            wordWrapColumn: 80,
            wordWrapMinified: true,
            wrappingIndent: 'none'
          }}
        />
      </div>
    );
  }
}

Editor.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  executeQuery: PropTypes.func.isRequired,
  setSelectedQuery: PropTypes.func.isRequired,
  setSelectedLine: PropTypes.func.isRequired
};
