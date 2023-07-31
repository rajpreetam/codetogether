import { AppDispatch, RootState } from "@/store";
import { updateInputText } from "@/store/features/webSockets/codeWsSlice";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const InputEditor = () => {
    const dispatch: AppDispatch = useDispatch();
    const socketData = useSelector(
        (state: RootState) => state.codeWs.socketData
    );

    const handleInputEditorChange = (value: string | undefined, event: any) => {
        dispatch(updateInputText(value??''));
    };

    return (
        <Editor
            height="300px"
            width="100%"
            theme="vs-dark"
            defaultLanguage="bash"
            onChange={handleInputEditorChange}
            value={socketData.input_text}
        />
    );
};

export default InputEditor;
