import { FilterVO } from "./../view-objects/utils/FilterVO";
import { Request, Response } from "express";
import { buildApiResponse } from "../helpers/staticMethods";
import logger from "../middlewares/logger";
import { WordVO } from "../view-objects/word/WordVO";
import { WordServiceInterface } from "../services/word/wordServiceInterface";
import { WordServiceImpl } from "../services/word/wordServiceImpl";

class WordController {
    public async readFileAndInsertWords(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: POST /readFileAndInsertWords");
            const { filepath } = req.body;
            if (!filepath) {
                logger.error(
                    "WordController readFileAndInsertWords - Falha de conversão de dados, body " +
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
            const wordService: WordServiceInterface = new WordServiceImpl();
            const result = await wordService.readFileAndInsertWords(filepath + "");
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
                "WordController readFileAndInsertWords - Falha inesperada ao ler arquivo e inserir palavras: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao ler arquivo e inserir palavras"
                    )
                );
        }
    }

    public async create(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: POST /word");
            const wordVO = req.body as WordVO;
            if (!wordVO) {
                logger.error(
                    "WordController create - Falha de conversão de dados, body " +
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
            const wordService: WordServiceInterface = new WordServiceImpl();
            const result = await wordService.create(wordVO);
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
                "WordController create - Falha inesperada ao inserir palavra: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao inserir palavra"
                    )
                );
        }
    }

    public async createMany(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: POST /createManyWord");
            const wordVO = req.body as WordVO[];
            if (!wordVO || !wordVO.length) {
                logger.error(
                    "WordController createMany - Falha de conversão de dados, body " +
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
            const wordService: WordServiceInterface = new WordServiceImpl();
            const result = await wordService.createMany(wordVO);
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
                "WordController createMany - Falha inesperada ao inserir palavras: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao inserir palavras"
                    )
                );
        }
    }

    public async edit(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: PUT /word/:id");
            const { id } = req.params;
            if (!id) {
                logger.error(
                    "WordController edit - Id não informado na requisição: " +
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

            const wordVO = req.body as WordVO;
            if (!wordVO) {
                logger.error(
                    "WordController edit - Falha de conversão de dados, body " +
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
            wordVO._id = id;
            const wordService: WordServiceInterface = new WordServiceImpl();
            const result = await wordService.edit(wordVO);
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
                "WordController edit - Falha inesperada ao editar palavra: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao inserir palavra"
                    )
                );
        }
    }

    public async remove(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: DELETE /word/:id");
            const { id } = req.params;
            if (!id) {
                logger.error(
                    "WordController remove - Id não informado na requisição: " +
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
            const wordService: WordServiceInterface = new WordServiceImpl();
            const result = await wordService.remove(id);
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
                "WordController remove - Falha inesperada ao deletar palavra: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao deletar palavra"
                    )
                );
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: GET /word/:id");
            const { id } = req.params;
            if (!id) {
                logger.error(
                    "WordController getById - Id não informado na requisição: " +
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
            const wordService: WordServiceInterface = new WordServiceImpl();
            const result = await wordService.getById(id);
            if (!result) {
                return res
                    .status(404)
                    .json(
                        buildApiResponse(false, 404, "Palavra não encontrada")
                    );
            }
            return res
                .status(200)
                .json(
                    buildApiResponse(
                        true,
                        200,
                        "Palavra listada com sucesso",
                        result
                    )
                );
        } catch (err) {
            logger.error(
                "WordController getById - Falha inesperada ao listar palavra: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao listar palavra"
                    )
                );
        }
    }

    public async getByText(req: Request, res: Response) {
        try {
            logger.info("Acessando endpoint: GET /word/text/");
            const { text } = req.params;
            if (!text) {
                logger.error(
                    "WordController getByText - Texto não informado na requisição: " +
                        req.params
                );
                res.status(400).json(
                    buildApiResponse(
                        false,
                        400,
                        "Texto não informado na requisição"
                    )
                );
            }
            const wordService: WordServiceInterface = new WordServiceImpl();
            const result = await wordService.getByText(text + "");
            if (!result) {
                return res
                    .status(404)
                    .json(
                        buildApiResponse(false, 404, "Palavra não encontrada")
                    );
            }
            return res
                .status(200)
                .json(
                    buildApiResponse(
                        true,
                        200,
                        "Palavra listada com sucesso",
                        result
                    )
                );
        } catch (err) {
            logger.error(
                "WordController getById - Falha inesperada ao listar palavra: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao listar palavra"
                    )
                );
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            logger.info(
                "Acessando endpoint: GET /word?page=number&limit=number&numberLetter=number"
            );
            const { page, limit, numberLetter } = req.query;
            if (!page || !limit || !numberLetter) {
                logger.error(
                    "wordController getAll - Parâmetros não informados para busca: " +
                        JSON.stringify(req.query)
                );
                return res
                    .status(400)
                    .json(
                        buildApiResponse(
                            false,
                            400,
                            "Parâmetros não informados para busca"
                        )
                    );
            }

            const wordService: WordServiceInterface = new WordServiceImpl();
            const result = await wordService.getAll({
                limit: Number(limit),
                numberLetter: Number(numberLetter),
                page: Number(page)
            });
            if (!result) {
                return res
                    .status(404)
                    .json(
                        buildApiResponse(false, 404, "Palavras não encontradas")
                    );
            }
            return res
                .status(200)
                .json(
                    buildApiResponse(
                        true,
                        200,
                        "Palavras listadas com sucesso",
                        result
                    )
                );
        } catch (err) {
            logger.error(
                "WordController getAll - Falha inesperada ao listar palavras: " +
                    err
            );
            return res
                .status(500)
                .json(
                    buildApiResponse(
                        false,
                        500,
                        "Falha inesperada ao listar palavras"
                    )
                );
        }
    }
}

export const wordController = new WordController();
