import { Request, Response, NextFunction } from "express";
import { buildApiResponse } from "../helpers/staticMethods";
import { ConfigServiceImpl } from "../services/config/configServiceImpl";
import { ConfigServiceInterface } from "../services/config/configServiceInterface";
import logger from "./logger";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyDefaultFirstAccess = process.env.KEY_DEFAULT_FIRST_ACCESS;
    const isUseKeyDefault = parseInt(process.env.IS_USE_KEY_DEFAULT);

    const system = "" + req.headers.system + "";
    const key = "" + req.headers.key + "";

    if (isUseKeyDefault === 1 && keyDefaultFirstAccess === key) {
      next();
      return;
    }

    if (!key || key == "" || !system || system == "") {
      logger.error(
        "Middleware authorize - Acesso negado, chaves não informadas na requisição"
      );
      res
        .status(403)
        .json(
          buildApiResponse(
            false,
            403,
            "Acesso negado, chave não informada na requisição"
          )
        );
      return;
    }
    const configService: ConfigServiceInterface = new ConfigServiceImpl();
    const configExist = await configService.getByToken(system);
    if (!configExist) {
      logger.error(
        "Middleware authorize - Acesso negado, sistema não encontrado"
      );
      res
        .status(403)
        .json(
          buildApiResponse(false, 403, "Acesso negado, sistema não encontrado")
        );
      return;
    }
    if (configExist.value != key) {
      logger.error("Middleware authorize - Acesso negado, chave incorreta");
      res
        .status(403)
        .json(buildApiResponse(false, 403, "Acesso negado, chave incorreta"));
      return;
    }
    next();
  } catch (err) {
    logger.error("Middleware authorize - Exceção: " + err);
    res.status(403).json(buildApiResponse(false, 403, "Acesso negado"));
  }
};
