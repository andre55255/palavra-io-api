import { Request, Response } from "express";
import { buildApiResponse } from "../helpers/staticMethods";
import logger from "../middlewares/logger";
import { ConfigServiceImpl } from "../services/config/configServiceImpl";
import { ConfigVO } from "../view-objects/config/configVO";
import { ConfigServiceInterface } from "./../services/config/configServiceInterface";

class ConfigController {
    public async create(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: POST /config");
            const configVO = req.body as ConfigVO;
            if (!configVO) {
                logger.error(
                    "ConfigController create - Falha de conversão de dados, body " +
                        req.body
                );
                return res
                    .status(400)
                    .json(
                        buildApiResponse(
                            false,
                            400,
                            "Falha na conversão de dados, verifique se eles foram enviados corretamente"
                        )
                    );
            }
            const configService: ConfigServiceInterface =
                new ConfigServiceImpl();
            const result = await configService.create(configVO);
            if (!result.success) {
                return res
                    .status(400)
                    .json(buildApiResponse(false, 400, result.message));
            }
            return res
                .status(201)
                .json(buildApiResponse(true, 201, result.message));
        } catch (err) {
            logger.error(
                "ConfigController create - Falha inesperada ao inserir configuração: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao inserir configuração"
                    )
                );
        }
    }

    public async edit(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: PUT /config/:id");
            const { id } = req.params;
            if (!id) {
                logger.error(
                    "ConfigController edit - Id não informado na requisição: " +
                        req.params
                );
                res.status(400).json(
                    buildApiResponse(
                        false,
                        400,
                        "Id não informado na requisição"
                    )
                );
            }

            const configVO = req.body as ConfigVO;
            if (!configVO) {
                logger.error(
                    "ConfigController edit - Falha de conversão de dados, body " +
                        req.body
                );
                return res
                    .status(400)
                    .json(
                        buildApiResponse(
                            false,
                            400,
                            "Falha na conversão de dados, verifique se eles foram enviados corretamente"
                        )
                    );
            }
            configVO._id = id;
            const configService: ConfigServiceInterface = new ConfigServiceImpl();
            const result = await configService.edit(configVO);
            if (!result.success) {
                return res
                    .status(400)
                    .json(buildApiResponse(false, 400, result.message));
            }
            return res
                .status(200)
                .json(buildApiResponse(true, 200, result.message));
        } catch (err) {
            logger.error(
                "ConfigController edit - Falha inesperada ao editar configuração: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao inserir configuração"
                    )
                );
        }
    }

    public async remove(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: DELETE /config/:id");
            const { id } = req.params;
            if (!id) {
                logger.error(
                    "ConfigController remove - Id não informado na requisição: " +
                        req.params
                );
                res.status(400).json(
                    buildApiResponse(
                        false,
                        400,
                        "Id não informado na requisição"
                    )
                );
            }
            const configService: ConfigServiceInterface = new ConfigServiceImpl();
            const result = await configService.remove(id);
            if (!result.success) {
                return res
                    .status(400)
                    .json(buildApiResponse(false, 400, result.message));
            }
            return res
                .status(200)
                .json(buildApiResponse(true, 200, result.message));
        } catch (err) {
            logger.error(
                "ConfigController remove - Falha inesperada ao deletar configuração: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao deletar configuração"
                    )
                );
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: GET /config/:id");
            const { id } = req.params;
            if (!id) {
                logger.error(
                    "ConfigController getById - Id não informado na requisição: " +
                        req.params
                );
                res.status(400).json(
                    buildApiResponse(
                        false,
                        400,
                        "Id não informado na requisição"
                    )
                );
            }
            const configService: ConfigServiceInterface = new ConfigServiceImpl();
            const result = await configService.getById(id);
            if (!result) {
                return res
                    .status(404)
                    .json(
                        buildApiResponse(
                            false,
                            404,
                            "Configuração não encontrada",
                        )
                    );
            }
            return res
                .status(200)
                .json(
                    buildApiResponse(
                        true,
                        200,
                        "Configuração listada com sucesso",
                        result
                    )
                );
        } catch (err) {
            logger.error(
                "ConfigController getById - Falha inesperada ao listar configuração: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao listar configuração"
                    )
                );
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: GET /config");
            const configService: ConfigServiceInterface = new ConfigServiceImpl();
            const result = await configService.getAll();
            if (!result) {
                return res
                    .status(404)
                    .json(
                        buildApiResponse(
                            false,
                            404,
                            "Configurações não encontradas"
                        )
                    );
            }
            return res
                .status(200)
                .json(
                    buildApiResponse(
                        true,
                        200,
                        "Configurações listadas com sucesso",
                        result
                    )
                );
        } catch (err) {
            logger.error(
                "ConfigController getAll - Falha inesperada ao listar configurações: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao listar configurações"
                    )
                );
        }
    }
}

export const configController = new ConfigController();
