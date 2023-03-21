import mongoose from "mongoose";
import logger from "../../middlewares/logger";

import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URL;

mongoose.connect(uri)
        .then(() => logger.info("MongoDB is connected"))
        .catch(err => logger.error("MongoDB Fail connect " + err));

export default mongoose;