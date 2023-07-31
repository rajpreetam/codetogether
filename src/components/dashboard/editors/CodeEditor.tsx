import { AppDispatch, RootState } from "@/store";
import { updateSourceCode } from "@/store/features/webSockets/codeWsSlice";
import supportedLanguage from "@/utils/supportedLanguage";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CodeEditor = () => {
    const dispatch: AppDispatch = useDispatch();
    const socketData = useSelector((state: RootState) => state.codeWs.socketData);

    
    const handleEditorChange = (value: string | undefined, event: any) => {
        localStorage.source_code = value;
        dispatch(updateSourceCode(value??''));
    };

    return (
        <Editor
            key={socketData.language_id}
            height="100%"
            width="100%"
            theme="vs-dark"
            defaultLanguage={
                supportedLanguage.find(
                    (language) => language.languageId === socketData.language_id
                )?.name
            }
            onChange={handleEditorChange}
            value={socketData.source_code}
        />
    );
};

export default CodeEditor;
