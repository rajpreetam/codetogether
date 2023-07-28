import React from 'react';
import CodeEditor from '@c/dashboard/CodeEditor';

const CodeComponent = () => {
    return (
        <div className='w-[50%]'>
            <div className='card p-2'>
                C++
            </div>
            <div className='card-light h-[calc(100vh-168px)] my-2'>
                <CodeEditor />
            </div>
            <div className='card p-2'>
                console
            </div>
        </div>
    );
};

export default CodeComponent;