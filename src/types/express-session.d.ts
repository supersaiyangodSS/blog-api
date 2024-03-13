import 'express-session';

declare module 'express-session' {
    export interface SessionData {
        user: string;
        role: string;
        userID: string;
        fullName: string
    }
}
