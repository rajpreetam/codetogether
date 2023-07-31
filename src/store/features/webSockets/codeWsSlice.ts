import { ActiveUsersDT, LanguageId, SocketData } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CodeSocketData {
    socketData: SocketData;
    activeUsers: ActiveUsersDT[];
    isCodeSubmitting: boolean;
    isConsoleIconClicked: boolean;
    isIoIconClicked: boolean;
}

const initialState: CodeSocketData = {
    socketData: {
        source_code:
            typeof window !== "undefined" ? localStorage.source_code : "",
        language_id: "54",
        input_text: "",
        output_text: "",
        console_text: "",
        disable_editor: false,
    },
    activeUsers: [],
    isCodeSubmitting: false,
    isConsoleIconClicked: false,
    isIoIconClicked: false,
};

export const codeWsSlice = createSlice({
    name: "chatWs",
    initialState,
    reducers: {
        updateSocketData: (state, action: PayloadAction<SocketData>) => {
            state.socketData = action.payload;
        },
        updateSourceCode: (state, action: PayloadAction<string>) => {
            state.socketData.source_code = action.payload;
        },
        updateLanguageId: (state, action: PayloadAction<LanguageId>) => {
            state.socketData.language_id = action.payload;
        },
        updateInputText: (state, action: PayloadAction<string>) => {
            state.socketData.input_text = action.payload;
        },
        updateOutputText: (state, action: PayloadAction<string>) => {
            state.socketData.output_text = action.payload;
        },
        updateConsoleText: (state, action: PayloadAction<string>) => {
            state.socketData.console_text = action.payload;
        },
        updateDisableEditor: (state, action: PayloadAction<boolean>) => {
            state.socketData.disable_editor = action.payload;
        },
        updateActiveUsers: (state, action: PayloadAction<ActiveUsersDT[]>) => {
            state.activeUsers = action.payload;
        },
        updateIsCodeSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isCodeSubmitting = action.payload;
        },
        updateIsConsoleIconClicked: (state, action: PayloadAction<boolean>) => {
            state.isConsoleIconClicked = action.payload;
        },
        updateIsIoIconClicked: (state, action: PayloadAction<boolean>) => {
            state.isIoIconClicked = action.payload;
        },
    },
});

export const {
    updateSocketData,
    updateSourceCode,
    updateLanguageId,
    updateInputText,
    updateOutputText,
    updateConsoleText,
    updateDisableEditor,
    updateActiveUsers,
    updateIsCodeSubmitting,
    updateIsConsoleIconClicked,
    updateIsIoIconClicked,
} = codeWsSlice.actions;
export default codeWsSlice.reducer;
