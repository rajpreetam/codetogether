"use client";
import React, { useEffect, useRef, useState } from "react";
import UtilityComponent from "./UtilityComponent";
import CodeComponent from "./CodeComponent";
import { toast } from "react-toastify";
import { ceJudgeBaseQuery } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
    updateActiveUsers,
    updateConsoleText,
    updateIsCodeSubmitting,
    updateIsConsoleIconClicked,
    updateIsIoIconClicked,
    updateOutputText,
    updateSocketData,
} from "@/store/features/webSockets/codeWsSlice";

type Props = {
    room_id: string;
};

const RoomSocketProvider = ({ room_id }: Props) => {
    const dispatch: AppDispatch = useDispatch();
    const wsRef = useRef<WebSocket | null>(null);
    const socketData = useSelector(
        (state: RootState) => state.codeWs.socketData
    );

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") ?? "");

        const ws = new WebSocket(
            `ws://127.0.0.1:8000/ws/code/${room_id}/${user?.username}`
        );
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("Connected to server");
        };

        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.new_username && data.new_username !== user.username) {
                toast.info(`${data.new_username} joined the room`);
            }

            if (data.active_users) {
                dispatch(updateActiveUsers(data.active_users));
            }

            if (data.username !== user.username) {
                const source_code = data.source_code;
                const language_id = data.language_id;
                const input_text = data.input_text;
                const output_text = data.output_text;
                const console_text = data.console_text;
                const disable_editor = data.disable_editor;

                dispatch(
                    updateSocketData({
                        source_code: source_code,
                        language_id: language_id,
                        input_text: input_text,
                        output_text: output_text,
                        console_text: console_text,
                        disable_editor: disable_editor,
                    })
                );
                localStorage.source_code = data.source_code;
            }
        };

        ws.onclose = () => {
            toast.error("Disconnected from server");
            localStorage.source_code = "";
        };

        return () => {
            wsRef.current?.close();
            wsRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const data = JSON.stringify(socketData);
            wsRef.current.send(data);
        }
    }, [
        socketData.source_code,
        socketData.console_text,
        socketData.input_text,
        socketData.output_text,
        socketData.language_id,
    ]);

    const handleCodeSubmit = () => {
        dispatch(updateIsCodeSubmitting(true));
        const body = {
            source_code: btoa(socketData.source_code),
            language_id: socketData.language_id,
            stdin: btoa(socketData.input_text),
        };

        try {
            ceJudgeBaseQuery
                .post("/submissions/?base64_encoded=true&wait=true", body)
                .then((res) => {
                    const token = res.data.token;
                    const url = `/submissions/${token}?base64_encoded=true`;

                    ceJudgeBaseQuery
                        .get(url)
                        .then((res) => {
                            const data = res.data;

                            if (data.status.id !== 3) {
                                dispatch(updateIsConsoleIconClicked(true));
                                dispatch(updateIsIoIconClicked(false));
                            } else {
                                dispatch(updateIsIoIconClicked(true));
                                dispatch(updateIsConsoleIconClicked(false));
                            }

                            const output_text = atob(data.stdout);
                            const console_text = `Status: ${
                                data.status.description
                            }\n\n${atob(
                                data.compile_output
                            )}\n\nNote: Check your selected language.`;

                            dispatch(updateOutputText(output_text));
                            if (data.status.id !== 3) {
                                dispatch(updateConsoleText(console_text));
                            } else {
                                dispatch(updateConsoleText(""));
                            }

                            dispatch(updateIsCodeSubmitting(false));
                        })
                        .catch((err) => {
                            if (err.response.status === 429) {
                                toast.error(
                                    "Your room ran out of submissions for the day. Please subscribe to our pro plan or visit tomorrow again."
                                );
                            } else {
                                toast.error("Something went wrong");
                            }
                            dispatch(updateIsCodeSubmitting(false));
                        });
                })
                .catch((err) => {
                    if (err.response.status === 429) {
                        toast.error(
                            "Your room ran out of submissions for the day. Please subscribe to our pro plan or visit tomorrow again."
                        );
                    } else {
                        toast.error("Something went wrong");
                    }
                    dispatch(updateIsCodeSubmitting(false));
                });
        } catch (err) {
            console.log(err);
            dispatch(updateIsCodeSubmitting(false));
        }
    };

    return (
        <div className="container-db min-w-[800px] fr-ic-sx2 py-2">
            <UtilityComponent room_id={room_id} />
            <CodeComponent handleCodeSubmit={handleCodeSubmit} />
        </div>
    );
};

export default RoomSocketProvider;
