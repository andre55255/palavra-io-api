import { Schema, model } from "mongoose";
import { TodayWordModel } from "./TodayWordModel";

const TodayWordSchema = new Schema({
    dateStr: {
        type: String,
        require: true,
    },
    value: {
        type: String,
        require: true,
    },
    numberLetters: {
        type: Number,
        require: true
    }
});

const TodayWordModel = model<TodayWordModel>("todayWords", TodayWordSchema);
export default TodayWordModel;