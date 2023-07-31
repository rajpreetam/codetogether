"use client";
import React, { FormEvent, KeyboardEvent, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { updateChat } from "@/store/features/webSockets/chatWsSlice";

type Props = {
    room_id: string;
};

const LiveChat = ({ room_id }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const chatData = useSelector((state: RootState) => state.chatWs.data);
    const user = useSelector((state: RootState) => state.auth.user);
    const wsRef = useRef<WebSocket | null>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wsUrl = `ws://127.0.0.1:8000/ws/chat/${room_id}/${user?.username}`;

        const ws = new WebSocket(wsUrl);

        wsRef.current = ws;

        ws.onopen = () => {
            console.log("Connected to chat server");
        };

        ws.onclose = () => {
            console.log("Disconnected from chat server");
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const currentDate = new Date();
            dispatch(
                updateChat({
                    message: data.chat_message,
                    sender: data.user.username,
                    created_at: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
                })
            );
        };
    }, []);

    useEffect(() => {
        if (chatContainerRef.current !== null) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current?.scrollHeight;
        }
    }, [chatData]);

    const sendChat = () => {
        const chatValue = inputRef.current?.textContent;
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const data = JSON.stringify({ chat_message: chatValue });
            wsRef.current.send(data);
        }

        if (inputRef.current !== null) {
            inputRef.current.textContent = "";
        }
    };

    const handleChatSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendChat();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            sendChat();
        }
    };

    return (
        <div className="w-full h-full fc">
            <div
                className="flex-1 fc-sy4 overflow-y-auto pb-6"
                ref={chatContainerRef}
            >
                <div className="fc border-b pb-2 border-text-d dark:border-text-l">
                    <p className="font-medium">Codetogether:</p>
                    <p>Start your chat here..</p>
                </div>
                {chatData.map((chat, index) => (
                    <div className="fc" key={index}>
                        <p className="font-medium">
                            {chat.sender} -{" "}
                            <span className="text-sm">{chat.created_at}</span>:
                        </p>
                        <p>{chat.message}</p>
                    </div>
                ))}
            </div>
            <form className="fr-ic-jb mt-2" onSubmit={handleChatSubmit}>
                <div
                    className="input w-[calc(100%-30px)] h-auto"
                    contentEditable
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    role="textbox"
                />
                <button type="submit">
                    <PaperAirplaneIcon className="icon" />
                </button>
            </form>
        </div>
    );
};

export default LiveChat;
