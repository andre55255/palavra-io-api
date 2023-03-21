export interface WordModel {
    _id?: string;
    text: string;
    numberLetters: number;
    createdAt?: Date,
    updatedAt?: Date,
    disabledAt?: Date
}