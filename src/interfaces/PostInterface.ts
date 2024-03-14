import { Document } from "mongoose";

export interface IPost extends Document {
    title: string,
    content: string,
    author: string,
    tags: string[],
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    isPublished: boolean,
    views: number,
    likes: number,
    likedBy: string[],
    comments: Array<{
        _id: string,
        author: string,
        text: string,
        role: string,
        createdTime: Date,
        userId: string,
        editedAt: Date
    }>
}