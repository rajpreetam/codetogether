'use client';
import React, { useState } from 'react';
import { Editor, OnChange } from '@monaco-editor/react';
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/outline';
import { SocketData } from '@/types';

type Props = {
    socketData: SocketData;
    handleEditorChange: OnChange;
    handleConsoleEditorChange: OnChange;
    handleInputEditorChange: OnChange;
    handleOutputEditorChange: OnChange;
};

const CodeComponent = ({
    socketData,
    handleEditorChange,
    handleConsoleEditorChange,
    handleInputEditorChange,
    handleOutputEditorChange,
}: Props) => {
    const [consoleIconClicked, setConsoleIconClicked] = useState(false);
    const [ioIconClicked, setIoIconClicked] = useState(false);

    const handleConsoleClick = () => {
        setConsoleIconClicked(!consoleIconClicked);
        setIoIconClicked(false);
    };

    const handleIoClick = () => {
        setIoIconClicked(!ioIconClicked);;
        setConsoleIconClicked(false);
    };

    return (
        <div className='w-[50%] h-[calc(100vh-72px)] fc relative'>
            <div className='card px-2 py-3'>
                C++
            </div>
            <div className='card-light flex-1 my-2'>
                <Editor
                    height='100%'
                    width='100%'
                    theme='vs-dark'
                    defaultLanguage='javascript'
                    onChange={handleEditorChange}
                    value={socketData.source_code}
                />
            </div>
            <div className={`card-light p-2 absolute w-full bottom-10 z-30 ${consoleIconClicked ? 'fc-sy2' : 'hidden'}`}>
                <p>Console</p>
                <Editor
                    height='200px'
                    width='100%'
                    theme='vs-dark'
                    defaultLanguage='bash'
                    onChange={handleConsoleEditorChange}
                    value={socketData.console_text}
                />
            </div>
            <div className={`card-light p-2 absolute w-full bottom-10 z-30 ${ioIconClicked ? 'fr-ic-sx2' : 'hidden'}`}>
                <div className='fc-sy2 w-[50%]'>
                    <p>Input</p>
                    <Editor
                        height='200px'
                        width='100%'
                        theme='vs-dark'
                        defaultLanguage='bash'
                        onChange={handleInputEditorChange}
                        value={socketData.input_text}
                    />
                </div>
                <div className='fc-sy2 w-[50%]'>
                    <p>Output</p>
                    <Editor
                        height='200px'
                        width='100%'
                        theme='vs-dark'
                        defaultLanguage='bash'
                        onChange={handleOutputEditorChange}
                        value={socketData.output_text}
                    />
                </div>
            </div>
            <div className='card p-2 fr-ic-jb'>
                <div className='fr-ic-sx2 cursor-pointer' onClick={handleConsoleClick}>
                    <p>console</p>
                    {consoleIconClicked ? <ChevronDownIcon className='icon-sm' /> : <ChevronUpIcon className='icon-sm' />}
                </div>
                <div className='fr-ic-sx2 cursor-pointer' onClick={handleIoClick}>
                    <p>input/output</p>
                    {ioIconClicked ? <ChevronDownIcon className='icon-sm' /> : <ChevronUpIcon className='icon-sm' />}
                </div>
            </div>
        </div>
    );
};

export default CodeComponent;