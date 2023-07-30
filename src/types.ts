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

type LanguageId = '50' | '54' | '62' | '63' | '68' | '71' | '74';

export interface Language {
    languageId: LanguageId;
    name: string;
    readableName: string;
}

export interface SocketData {
    source_code: string;
    language_id: LanguageId;
    input_text: string;
    output_text: string;
    console_text: string;
    disable_editor: boolean;
};

export interface ActiveUsersDT {
    user: User
};