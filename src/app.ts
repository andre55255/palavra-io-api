import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import "./config/database/connection";

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

    private routes() {}

    private docs() {
        this.server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }
}