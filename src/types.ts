export interface User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface TokenData {
    access: string;
    refresh: string;
};

export interface SocketData {
    source_code: string;
    language_id: string;
    input_text: string;
    output_text: string;
    console_text: string;
    disable_editor: boolean;
};