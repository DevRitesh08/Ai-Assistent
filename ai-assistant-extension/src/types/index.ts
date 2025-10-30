export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Message {
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: Date;
}

export interface Avatar {
    url: string;
    expressions: string[];
}

export interface Settings {
    theme: string;
    notificationsEnabled: boolean;
}

export type ServiceResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};