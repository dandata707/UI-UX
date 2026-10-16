import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  id: string;
  defaultText: string;
  isEditMode: boolean;
  value?: string;
  onChange?: (id: string, newText: string) => void;
  className?: string;
  tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  defaultText,
  isEditMode,
  value,
  onChange,
  className = '',
  tag: Tag = 'span',
  multiline = false,
}) => {
  const currentText = value !== undefined ? value : defaultText;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(currentText);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(currentText);
  }, [currentText]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange && text !== currentText) {
      onChange(id, text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setText(currentText);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`border-2 border-emerald-500 bg-white text-gray-900 rounded px-1.5 py-0.5 w-full text-xs outline-none shadow-sm ${className}`}
          rows={3}
          onClick={(e) => e.stopPropagation()}
        />
      );
    }
    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`border-2 border-emerald-500 bg-white text-gray-900 rounded px-1.5 py-0.5 text-xs outline-none inline-block shadow-sm ${className}`}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  const editStyles = isEditMode
    ? 'cursor-text hover:bg-emerald-50/80 hover:ring-1 hover:ring-emerald-400 rounded transition-all px-0.5'
    : '';

  return (
    <Tag
      onClick={(e) => {
        if (isEditMode) {
          e.stopPropagation();
          setIsEditing(true);
        }
      }}
      title={isEditMode ? 'Nhấp để sửa chữ này' : undefined}
      className={`${className} ${editStyles}`}
    >
      {currentText}
    </Tag>
  );
};
