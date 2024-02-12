import { Component } from 'react';

import MonacoEditor from '@monaco-editor/react';
import PropTypes from 'prop-types';

export class Editor extends Component {
  render() {
    const { query, setQuery, selectedTable } = this.props;
    return (
      <div style={{ height: '100%' }}>
        <h3 className="my-2">SQL Editor</h3>
        <MonacoEditor
          height={600}
          defaultLanguage="sql"
          value={
            selectedTable ? `SELECT * FROM ${selectedTable} LIMIT 10;` : query
          }
          onChange={value => setQuery(value)}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 20,
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
            wordWrap: 'on',
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
  selectedTable: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired
};
