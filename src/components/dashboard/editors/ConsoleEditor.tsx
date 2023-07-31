import { AppDispatch, RootState } from "@/store";
import { updateConsoleText } from "@/store/features/webSockets/codeWsSlice";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ConsoleEditor = () => {
    const dispatch: AppDispatch = useDispatch();
    const socketData = useSelector((state: RootState) => state.codeWs.socketData);

    const handleConsoleEditorChange = (value: string | undefined, event: any) => {
        dispatch(updateConsoleText(value??''));
    };

    return (
        <Editor
            height="300px"
            width="100%"
            theme="vs-dark"
            defaultLanguage="bash"
            onChange={handleConsoleEditorChange}
            value={socketData.console_text}
        />
    );
};

export default ConsoleEditor;
