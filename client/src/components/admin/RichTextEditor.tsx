'use client';

import { useRef, useCallback, useState, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FONT_FACES = [
  { label: 'Default', value: '' },
  { label: 'Serif (Georgia)', value: 'Georgia, serif' },
  { label: 'Sans-Serif (Arial)', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Monospace (Courier)', value: '"Courier New", Courier, monospace' },
  { label: 'Elegant (Palatino)', value: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
  { label: 'Modern (Verdana)', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Classic (Times)', value: '"Times New Roman", Times, serif' },
];

const FONT_SIZES = [
  { label: 'Small', value: '1' },
  { label: 'Normal', value: '3' },
  { label: 'Large', value: '5' },
  { label: 'X-Large', value: '6' },
  { label: 'Huge', value: '7' },
];

const TEXT_COLORS = [
  '#e8e4dc', '#ffffff', '#c9a84c', '#e74c3c', '#27ae60',
  '#3498db', '#9b59b6', '#e67e22', '#1abc9c', '#f39c12',
  '#ff6b6b', '#a8e6cf', '#95e1d3', '#fce38a',
];

const HEADING_OPTIONS = [
  { label: 'Normal', value: 'p' },
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Heading 3', value: 'h3' },
  { label: 'Heading 4', value: 'h4' },
];

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing your description...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });
  const isInternalUpdate = useRef(false);

  // Sync external value → editor HTML only on initial mount or when value changes externally
  useEffect(() => {
    if (editorRef.current && !isInternalUpdate.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
    isInternalUpdate.current = false;
  }, [value]);

  const updateActiveStates = useCallback(() => {
    setActiveStates({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikethrough: document.queryCommandState('strikeThrough'),
    });
  }, []);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalUpdate.current = true;
      onChange(editorRef.current.innerHTML);
      updateActiveStates();
    }
  }, [onChange, updateActiveStates]);

  const execCommand = useCallback((command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleInput();
  }, [handleInput]);

  const handleFontFace = useCallback((fontFamily: string) => {
    if (fontFamily) {
      execCommand('fontName', fontFamily);
    }
  }, [execCommand]);

  const handleFontSize = useCallback((size: string) => {
    execCommand('fontSize', size);
  }, [execCommand]);

  const handleHeading = useCallback((tag: string) => {
    execCommand('formatBlock', tag);
  }, [execCommand]);

  const handleColor = useCallback((color: string) => {
    execCommand('foreColor', color);
    setShowColorPicker(false);
  }, [execCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle Ctrl shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          break;
      }
    }
  }, [execCommand]);

  const ToolbarButton = ({ 
    onClick, 
    active = false, 
    title, 
    children 
  }: { 
    onClick: () => void; 
    active?: boolean; 
    title: string; 
    children: React.ReactNode 
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`rte-toolbar-btn ${active ? 'rte-toolbar-btn-active' : ''}`}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => <div className="rte-toolbar-divider" />;

  return (
    <div className="rte-container">
      {/* ─── Toolbar ─── */}
      <div className="rte-toolbar">
        {/* Row 1: Text formatting */}
        <div className="rte-toolbar-row">
          {/* Bold / Italic / Underline / Strikethrough */}
          <div className="rte-toolbar-group">
            <ToolbarButton onClick={() => execCommand('bold')} active={activeStates.bold} title="Bold (Ctrl+B)">
              <strong>B</strong>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('italic')} active={activeStates.italic} title="Italic (Ctrl+I)">
              <em>I</em>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('underline')} active={activeStates.underline} title="Underline (Ctrl+U)">
              <span style={{ textDecoration: 'underline' }}>U</span>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('strikeThrough')} active={activeStates.strikethrough} title="Strikethrough">
              <span style={{ textDecoration: 'line-through' }}>S</span>
            </ToolbarButton>
          </div>

          <ToolbarDivider />

          {/* Text Color */}
          <div className="rte-toolbar-group" style={{ position: 'relative' }}>
            <ToolbarButton onClick={() => setShowColorPicker(!showColorPicker)} title="Text Color">
              <span className="rte-color-icon">
                A
                <span className="rte-color-bar" />
              </span>
            </ToolbarButton>
            {showColorPicker && (
              <div className="rte-color-picker">
                {TEXT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColor(color)}
                    className="rte-color-swatch"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>

          <ToolbarDivider />

          {/* Paragraph / Heading */}
          <div className="rte-toolbar-group">
            <select
              onChange={(e) => handleHeading(e.target.value)}
              className="rte-toolbar-select"
              title="Heading"
              defaultValue="p"
            >
              {HEADING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <ToolbarDivider />

          {/* Font Face */}
          <div className="rte-toolbar-group">
            <select
              onChange={(e) => handleFontFace(e.target.value)}
              className="rte-toolbar-select rte-toolbar-select-wide"
              title="Font Face"
              defaultValue=""
            >
              {FONT_FACES.map((font) => (
                <option key={font.label} value={font.value}>{font.label}</option>
              ))}
            </select>
          </div>

          <ToolbarDivider />

          {/* Font Size */}
          <div className="rte-toolbar-group">
            <select
              onChange={(e) => handleFontSize(e.target.value)}
              className="rte-toolbar-select"
              title="Font Size"
              defaultValue="3"
            >
              {FONT_SIZES.map((size) => (
                <option key={size.value} value={size.value}>{size.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Lists, alignment, extras */}
        <div className="rte-toolbar-row">
          {/* Lists */}
          <div className="rte-toolbar-group">
            <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Bullet List">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="9" y1="6" x2="20" y2="6" /><line x1="9" y1="12" x2="20" y2="12" /><line x1="9" y1="18" x2="20" y2="18" />
                <circle cx="4" cy="6" r="1.5" fill="currentColor" /><circle cx="4" cy="12" r="1.5" fill="currentColor" /><circle cx="4" cy="18" r="1.5" fill="currentColor" />
              </svg>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Numbered List">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="10" y1="6" x2="20" y2="6" /><line x1="10" y1="12" x2="20" y2="12" /><line x1="10" y1="18" x2="20" y2="18" />
                <text x="2" y="8" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">1</text>
                <text x="2" y="14" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">2</text>
                <text x="2" y="20" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif">3</text>
              </svg>
            </ToolbarButton>
          </div>

          <ToolbarDivider />

          {/* Alignment */}
          <div className="rte-toolbar-group">
            <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Align Left">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="10" x2="15" y2="10" /><line x1="3" y1="14" x2="21" y2="14" /><line x1="3" y1="18" x2="15" y2="18" />
              </svg>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Align Center">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="10" x2="18" y2="10" /><line x1="3" y1="14" x2="21" y2="14" /><line x1="6" y1="18" x2="18" y2="18" />
              </svg>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('justifyRight')} title="Align Right">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="10" x2="21" y2="10" /><line x1="3" y1="14" x2="21" y2="14" /><line x1="9" y1="18" x2="21" y2="18" />
              </svg>
            </ToolbarButton>
          </div>

          <ToolbarDivider />

          {/* Indent / Outdent */}
          <div className="rte-toolbar-group">
            <ToolbarButton onClick={() => execCommand('indent')} title="Increase Indent">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="10" x2="21" y2="10" /><line x1="9" y1="14" x2="21" y2="14" /><line x1="3" y1="18" x2="21" y2="18" />
                <polyline points="3,9 6,12 3,15" />
              </svg>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('outdent')} title="Decrease Indent">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="9" y1="10" x2="21" y2="10" /><line x1="9" y1="14" x2="21" y2="14" /><line x1="3" y1="18" x2="21" y2="18" />
                <polyline points="6,9 3,12 6,15" />
              </svg>
            </ToolbarButton>
          </div>

          <ToolbarDivider />

          {/* Blockquote & Horizontal Rule */}
          <div className="rte-toolbar-group">
            <ToolbarButton onClick={() => execCommand('formatBlock', 'blockquote')} title="Block Quote">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('insertHorizontalRule')} title="Horizontal Line">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
            </ToolbarButton>
          </div>

          <ToolbarDivider />

          {/* Undo / Redo */}
          <div className="rte-toolbar-group">
            <ToolbarButton onClick={() => execCommand('undo')} title="Undo">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10h10a5 5 0 0 1 0 10H12" /><polyline points="7,14 3,10 7,6" />
              </svg>
            </ToolbarButton>
            <ToolbarButton onClick={() => execCommand('redo')} title="Redo">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10H11a5 5 0 0 0 0 10h1" /><polyline points="17,14 21,10 17,6" />
              </svg>
            </ToolbarButton>
          </div>

          <ToolbarDivider />

          {/* Clear Formatting */}
          <div className="rte-toolbar-group">
            <ToolbarButton onClick={() => execCommand('removeFormat')} title="Clear Formatting">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="4" x2="20" y2="20" /><path d="M8 4h8l-4 12" />
              </svg>
            </ToolbarButton>
          </div>
        </div>
      </div>

      {/* ─── Editable Area ─── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="rte-editor"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onMouseUp={updateActiveStates}
        onKeyUp={updateActiveStates}
        data-placeholder={placeholder}
      />

      {/* Click-outside handler for color picker */}
      {showColorPicker && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowColorPicker(false)}
        />
      )}
    </div>
  );
}
