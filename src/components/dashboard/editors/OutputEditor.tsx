import { AppDispatch, RootState } from "@/store";
import { updateOutputText } from "@/store/features/webSockets/codeWsSlice";
import { Editor } from "@monaco-editor/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const OutputEditor = () => {
    const dispatch: AppDispatch = useDispatch();
    const socketData = useSelector(
        (state: RootState) => state.codeWs.socketData
    );

    const handleOutputEditorChange = (value: string | undefined, event: any) => {
        dispatch(updateOutputText(value??''));
    };

    return (
        <Editor
            height="300px"
            width="100%"
            theme="vs-dark"
            defaultLanguage="bash"
            onChange={handleOutputEditorChange}
            value={socketData.output_text}
        />
    );
};

export default OutputEditor;
