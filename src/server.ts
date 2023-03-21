import { App } from "./app";
import logger from "./middlewares/logger";

const PORT_SERVER = process.env.PORT_SERVER || 8081;

new App().server.listen(PORT_SERVER, 
    () => logger.info(`Listening in port ${PORT_SERVER}`));