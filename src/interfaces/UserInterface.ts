import { Document } from "mongoose";

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    role: string,
    loginAttempts: number,
    createdAt: Date,
    updatedAt: Date,
}