import { Schema, model } from "mongoose";
import { ConfigModel } from "./ConfigModel";

const ConfigSchema = new Schema({
    token: {
        type: String,
        require: true,
        unique: true,
    },
    value: {
        type: String,
        require: true,
    },
});

const ConfigModel = model<ConfigModel>("configs", ConfigSchema);

export default ConfigModel;
