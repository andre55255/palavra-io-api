import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import "./config/database/connection";

import configRouter from "./routes/configRouter";
import todayWordRouter from "./routes/todayWordRouter";
import wordRouter from "./routes/wordRouter";

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.docs();
    }

    private middlewares() {
        dotenv.config();
        this.server.use(
            cors({
                origin: ["http://localhost:3000"],
            })
        );
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
    }

    private routes() {
        this.server.use(configRouter);
        this.server.use(todayWordRouter);
        this.server.use(wordRouter);
    }

    private docs() {
        this.server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }
}
