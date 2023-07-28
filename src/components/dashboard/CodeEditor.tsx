'use client'
import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';

const CodeEditor = () => {
    const [editorValue, setEditorValue] = useState(typeof window !== 'undefined' ? localStorage?.editor_value ?? '' : '');

    const handleEditorChange = (value: string | undefined, event: any) => {
        localStorage.setItem('editor_value', value ?? '');
        setEditorValue(value);
    };

    return (
        <Editor
            height='100%'
            width='100%'
            theme='vs-dark'
            defaultLanguage='javascript'
            onChange={handleEditorChange}
            value={editorValue}
        />
    );
};

export default CodeEditor;