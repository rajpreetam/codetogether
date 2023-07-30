import React, { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import {PaperAirplaneIcon} from '@heroicons/react/24/outline';

type Props = {
    room_id: string;
};

const LiveChat = ({room_id}: Props) => {
    const wsRef = useRef<WebSocket | null>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const [chatData, setChatData] = useState<{name: string, chat: string}[]>([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')??'');
        const wsUrl = `ws://127.0.0.1:8000/ws/chat/${room_id}/${user.username}`;

        const ws = new WebSocket(wsUrl);

        wsRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to chat server');
        };

        ws.onclose = () => {
            console.log('Disconnected from chat server');
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
            
        }
    });

    useEffect(() => {
        if(chatContainerRef.current !== null) {
            chatContainerRef.current.scrollTop = chatContainerRef.current?.scrollHeight;
        }
    }, [chatData]);

    const sendChat = () => {
        const chatValue = inputRef.current?.textContent;
        setChatData([...chatData, {name: 'You', chat: chatValue??''}]);

        if(wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({chat_message: chatValue});
            wsRef.current.send(data);
        }

        if(inputRef.current !== null) {
            inputRef.current.textContent = '';
        }
    };

    const handleChatSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendChat();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if(e.key==='Enter' && !e.shiftKey) {
            sendChat();
        }
    };

    return (
        <div className='w-full h-full fc'>
            <div className='flex-1 fc-sy4 overflow-y-auto pb-6' ref={chatContainerRef}>
                <div className='fc border-b pb-2 border-text-d dark:border-text-l'>
                    <p className='font-medium'>Codetogether:</p>
                    <p>Start your chat here..</p>
                </div>
                {chatData.map((item, index) => (
                    <div className='fc' key={index}>
                        <p className='font-medium'>{item.name}:</p>
                        <p>{item.chat}</p>
                    </div>
                ))}
            </div>
            <form className='fr-ic-jb mt-2' onSubmit={handleChatSubmit}>
                <div
                    className='input w-[calc(100%-30px)] h-auto'
                    contentEditable
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    role='textbox'
                />
                <button type='submit'>
                    <PaperAirplaneIcon className='icon' />
                </button>
            </form>
        </div>
    );
};

export default LiveChat;
