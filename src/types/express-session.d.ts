import 'express-session';

declare module 'express-session' {
    export interface SessionData {
        user: string;
        role: string;
        uid: string;
    }
}
