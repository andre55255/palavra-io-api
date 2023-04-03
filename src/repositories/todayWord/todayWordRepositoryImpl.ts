import { TodayWordModel } from "../../config/database/models/todayWord/TodayWordModel";
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { ResultVO } from "../../view-objects/utils/ResultVO";
import { TodayWordRepositoryInterface } from "./todayWordRepositoryInterface";
import dbTodayWord from "../../config/database/models/todayWord/TodayWord";

export class TodayWordRepositoryImpl implements TodayWordRepositoryInterface {
    public async create(model: TodayWordModel): Promise<ResultVO> {
        try {
            model.value = model.value.toUpperCase();
            const modelCreated = await dbTodayWord.create(model);
            if (modelCreated._id) {
                logger.info(
                    "TodayWordRepository create - Palavra do dia criada com sucesso: " +
                        JSON.stringify(modelCreated.toJSON())
                );
                return buildResult(
                    true,
                    "Palavra do dia criada com sucesso",
                    modelCreated
                );
            }
            logger.error(
                "TodayWordRepository create - Falha ao inserir palavra do dia na base de dados: " +
                    JSON.stringify(modelCreated.toJSON())
            );
            return buildResult(
                false,
                "Falha ao inserir palavra do dia na base de dados"
            );
        } catch (err) {
            logger.error(
                "TodayWordRepository create - Exception: " +
                    err +
                    ". Model: " +
                    JSON.stringify(model)
            );
            return buildResult(
                false,
                "Falha inesperada ao criar palavra do dia"
            );
        }
    }
    public async edit(model: TodayWordModel): Promise<ResultVO> {
        try {
            model.value = model.value.toUpperCase();
            const modelSave = await dbTodayWord.findOne({ _id: model._id });
            if (!modelSave) {
                logger.error(
                    `TodayWordRepository edit - Palavra do dia não encontrada. Model: ${
                        model._id
                    } - ${JSON.stringify(model)}`
                );
                return buildResult(false, "Palavra do dia não encontrada");
            }
            const result = await dbTodayWord.updateOne(
                { _id: model._id },
                model
            );
            if (!result || !result.matchedCount) {
                logger.error(
                    `TodayWordRepository edit - Falha ao editar palavra do dia. Model:  ${
                        model._id
                    } - ${JSON.stringify(model)}`
                );
                return buildResult(
                    false,
                    "Falha ao editar palavra do dia na base de dados"
                );
            }
            logger.info(
                "TodayWordRepository edit - Palavra do dia editada com sucesso"
            );
            return buildResult(true, "Palavra do dia editada com sucesso");
        } catch (err) {
            logger.error(
                "TodayWordRepository edit - Exception: " +
                    err +
                    ". Model: " +
                    JSON.stringify(model)
            );
            return buildResult(
                false,
                "Falha inesperada ao editar palavra do dia"
            );
        }
    }
    public async getByDateByNumberLetters(date: string | String, numberLetters: number | Number): Promise<TodayWordModel> {
        try {
            const modelSave = await dbTodayWord.findOne({ dateStr: date, numberLetters });
            if (!modelSave) {
                logger.error(
                    `TodayWordRepository getByDate - Palavra do dia não encontrada com o date: ${date}`
                );
                return null;
            }
            return modelSave;
        } catch (err) {
            logger.error(
                "TodayWordRepository getByDate - Exception: " +
                    err +
                    ". Id: " +
                    date
            );
            return null;
        }
    }
    public async getAll(): Promise<TodayWordModel[]> {
        try {
            const modelSave = await dbTodayWord.find({});
            return modelSave;
        } catch (err) {
            logger.error("TodayWordRepository getAll - Exception: " + err);
            return null;
        }
    }
}
