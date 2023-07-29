'use client';
import React, { useEffect, useRef, useState } from 'react'
import UtilityComponent from './UtilityComponent';
import CodeComponent from './CodeComponent';
import { toast } from 'react-toastify';
import { SocketData } from '@/types';
import { ceJudgeBaseQuery } from '@/services';

type Props = {
    room_id: string;
};

const RoomSocketProvider = ({room_id}: Props) => {
    const wsRef = useRef<WebSocket | null>(null);

    const [socketData, setSocketData] = useState<SocketData>({
        source_code: typeof window !== 'undefined' ? localStorage.source_code : '',
        language_id: '54',
        input_text: '',
        output_text: '',
        console_text: '',
        disable_editor: false
    });

    const [codeSubmitLoading, setCodeSubmitLoading] = useState(false);
    const [consoleIconClicked, setConsoleIconClicked] = useState(false);
    const [ioIconClicked, setIoIconClicked] = useState(false);
    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')??'');

        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/code/${room_id}/${user?.username}`);
        wsRef.current = ws;

        ws.onopen = () => {
            toast.info('Connected to server');
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if(data.username !== user.username) {
                const source_code = data.source_code;
                const language_id = data.language_id;
                const input_text = data.input_text;
                const output_text = data.output_text;
                const console_text = data.console_text;
                const disable_editor = data.disable_editor;

                setSocketData({
                    ...socketData,
                    source_code: source_code,
                    language_id: language_id,
                    input_text: input_text,
                    output_text: output_text,
                    console_text: console_text,
                    disable_editor: disable_editor,
                });
                localStorage.source_code = data.source_code;
            }
        };

        ws.onclose = () => {
            toast.error('Disconnected from server');
            localStorage.source_code = '';
        };

        return () => {
            wsRef.current?.close();
            wsRef.current = null;
        }

    }, []);

    const handleEditorChange = (value: string | undefined, event: any) => {
        localStorage.source_code = value;
        setSocketData({...socketData, source_code: value??''});
    };

    const handleConsoleEditorChange = (value: string | undefined, event: any) => {
        setSocketData({...socketData, console_text: value??''});
    };

    const handleInputEditorChange = (value: string | undefined, event: any) => {
        setSocketData({...socketData, input_text: value??''});
    };

    const handleOutputEditorChange = (value: string | undefined, event: any) => {
        setSocketData({...socketData, output_text: value??''});
    };

    useEffect(() => {
        if(wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const data = JSON.stringify(socketData);
            wsRef.current.send(data);
        }
    }, [
        socketData.source_code,
        socketData.console_text,
        socketData.input_text,
        socketData.output_text,
        socketData.language_id
    ]);

    const handleCodeSubmit = () => {
        setCodeSubmitLoading(true);
        const body = {
            source_code: btoa(socketData.source_code),
            language_id: socketData.language_id,
            stdin: btoa(socketData.input_text)
        }

        try {
            ceJudgeBaseQuery.post('/submissions/?base64_encoded=true&wait=true', body)
                .then(res => {
                    const token = res.data.token;
                    const url = `/submissions/${token}?base64_encoded=true`;

                    ceJudgeBaseQuery.get(url)
                        .then(res => {
                            const data = res.data;                            

                            if(data.status.id !== 3) {
                                setConsoleIconClicked(true);
                                setIoIconClicked(false);
                            } else {
                                setIoIconClicked(true);
                                setConsoleIconClicked(false);
                            }

                            const output_text = atob(data.stdout);
                            const console_text = `Status: ${data.status.description}\n\n${atob(data.compile_output)}\n\nNote: Check your selected language.`;
                            setSocketData({
                                ...socketData,
                                output_text: output_text,
                                console_text: data.status.id !== 3 ? console_text : ''
                            })
                            setCodeSubmitLoading(false);
                            
                        })
                        .catch(err => {
                            if(err.response.status === 429) {
                                toast.error('Your room ran out of submissions for the day. Please subscribe to our pro plan or visit tomorrow again.');
                            }else {
                                toast.error('Something went wrong');
                            }
                            setCodeSubmitLoading(false);
                            
                        });                    
                })
                .catch(err => {
                    if(err.response.status === 429) {
                        toast.error('Your room ran out of submissions for the day. Please subscribe to our pro plan or visit tomorrow again.');
                    }else {
                        toast.error('Something went wrong');
                    }                    
                    setCodeSubmitLoading(false);
                })
        } catch(err) {
            console.log(err);
            setCodeSubmitLoading(false);
        }
    };

    return (
        <div className='container-db min-w-[800px] fr-ic-sx2 py-2'>
            <UtilityComponent room_id={room_id} />
            <CodeComponent
                socketData={socketData}
                setSocketData={setSocketData}
                handleEditorChange={handleEditorChange}
                handleConsoleEditorChange={handleConsoleEditorChange}
                handleInputEditorChange={handleInputEditorChange}
                handleOutputEditorChange={handleOutputEditorChange}
                handleCodeSubmit={handleCodeSubmit}
                codeSubmitLoading={codeSubmitLoading}
                consoleIconClicked={consoleIconClicked}
                setConsoleIconClicked={setConsoleIconClicked}
                ioIconClicked={ioIconClicked}
                setIoIconClicked={setIoIconClicked}
            />
        </div>
    );
};

export default RoomSocketProvider;