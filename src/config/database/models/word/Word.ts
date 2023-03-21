import { Schema, model } from "mongoose";
import { WordModel } from "./WordModel";

const WordSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    numberLetters: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        require: true,
        default: new Date()
    },
    disabledAt: {
        type: Date,
        require: false,
        default: null
    }
});

const WordModel = model<WordModel>("words", WordSchema);

export default WordModel;