import { Request, Response } from "express";
import { buildApiResponse } from "../helpers/staticMethods";
import logger from "../middlewares/logger";
import { TodayWordServiceImpl } from "../services/todayWord/todayWordServiceImpl";
import { TodayWordServiceInterface } from "../services/todayWord/todayWordServiceInterface";
import { TodayWordVO } from "../view-objects/todayWord/TodayWordVO";

class TodayWordController {
    public async create(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: POST /todayWord");
            const wordVO = req.body as TodayWordVO;
            if (!wordVO) {
                logger.error(
                    "TodayWordController create - Falha de conversão de dados, body " +
                        JSON.stringify(req.body)
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
            const todayWordService: TodayWordServiceInterface = new TodayWordServiceImpl();
            const result = await todayWordService.create(wordVO);
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
                "TodayWordController create - Falha inesperada ao inserir palavra do dia: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao inserir palavra do dia"
                    )
                );
        }
    }

    public async edit(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: PUT /todayWord/:id");
            const { id } = req.params;
            if (!id) {
                logger.error(
                    "TodayWordController edit - Id não informado na requisição: " +
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

            const wordVO = req.body as TodayWordVO;
            if (!wordVO) {
                logger.error(
                    "TodayWordController edit - Falha de conversão de dados, body " +
                        JSON.stringify(req.body)
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
            wordVO._id = id;
            const todayWordService: TodayWordServiceInterface = new TodayWordServiceImpl();
            const result = await todayWordService.edit(wordVO);
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
                "TodayWordController edit - Falha inesperada ao editar palavra do dia: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao inserir palavra do dia"
                    )
                );
        }
    }

    public async getByDateByNumberLetters(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: GET /todayWord/:date/:numberLetters");
            const { date, numberLetters } = req.params;
            if (!date || !numberLetters) {
                logger.error(
                    "WordController getByDateByNumberLetters - Parâmetros não informados na requisição: " +
                        JSON.stringify(req.params)
                );
                res.status(400).json(
                    buildApiResponse(
                        false,
                        400,
                        "Parâmetros não informados na requisição"
                    )
                );
            }
            const dateParam = date;
            const numberLettersParam = parseInt(numberLetters);

            const todayWordService: TodayWordServiceInterface = new TodayWordServiceImpl();
            const result = await todayWordService.getByDateByNumberLetters(dateParam, numberLettersParam);
            if (!result) {
                return res
                    .status(404)
                    .json(
                        buildApiResponse(false, 404, "Palavra do dia não encontrada")
                    );
            }
            return res
                .status(200)
                .json(
                    buildApiResponse(
                        true,
                        200,
                        "Palavra do dia listada com sucesso",
                        result
                    )
                );
        } catch (err) {
            logger.error(
                "TodayWordController getByDateByNumberLetters - Falha inesperada ao listar palavra do dia: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao listar palavra do dia"
                    )
                );
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            logger.info(
                "Acessando endpoint: GET /todayWord"
            );
            const todayWordService: TodayWordServiceInterface = new TodayWordServiceImpl();
            const result = await todayWordService.getAll();
            if (!result) {
                return res
                    .status(404)
                    .json(
                        buildApiResponse(false, 404, "Palavras do dia não foram encontradas")
                    );
            }
            return res
                .status(200)
                .json(
                    buildApiResponse(
                        true,
                        200,
                        "Palavras do dia listadas com sucesso",
                        result
                    )
                );
        } catch (err) {
            logger.error(
                "TodayWordController getAll - Falha inesperada ao listar palavras do dia: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao listar palavras do dia"
                    )
                );
        }
    }
}

export const todayWordController = new TodayWordController();