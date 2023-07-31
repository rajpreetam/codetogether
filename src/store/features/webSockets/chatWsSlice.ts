import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ChatSocketData {
    message: string;
    sender: string;
    created_at: string;
}

export interface ChatWsState {
    data: ChatSocketData[];
}

const initialState: ChatWsState = {
    data: [],
};

export const chatWsSlice = createSlice({
    name: "chatWs",
    initialState,
    reducers: {
        updateChat: (state, action: PayloadAction<ChatSocketData>) => {
            state.data.push(action.payload);           
        },
    },
});

export const { updateChat } = chatWsSlice.actions;
export default chatWsSlice.reducer;
