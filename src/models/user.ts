export interface User {
    data: Data;
    userdata: Userdata;
    status: string;
    message: string;
}

export interface Userdata {
    id: number;
    name: string;
    email: string;
    email_verified_at?: any;
    created_at: string;
    updated_at: string;
    user_type: string;
    is_active: string;
    can_edit_attendance: number;
    available_leaves: number;
    github_username?: any;
    github_token?: any;
    telegram_username?: any;
    telegram_token?: any;
    birthdate?: any;
}

export interface Data {
    token_type: string;
    expires_in: number;
    access_token: string;
    refresh_token: string;
}