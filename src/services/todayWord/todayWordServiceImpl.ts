import { TodayWordModel } from "../../config/database/models/todayWord/TodayWordModel";
import { buildResult, formatDate } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { TodayWordRepositoryImpl } from "../../repositories/todayWord/todayWordRepositoryImpl";
import { TodayWordRepositoryInterface } from "../../repositories/todayWord/todayWordRepositoryInterface";
import { TodayWordVO } from "../../view-objects/todayWord/TodayWordVO";
import { ResultVO } from "../../view-objects/utils/ResultVO";
import { TodayWordServiceInterface } from "./todayWordServiceInterface";

export class TodayWordServiceImpl implements TodayWordServiceInterface {
    private todayWordRepo: TodayWordRepositoryInterface;

    constructor() {
        this.todayWordRepo = new TodayWordRepositoryImpl();
    }

    public async create(model: TodayWordVO): Promise<ResultVO> {
        try {
            const existItemDate = await this.getByDateByNumberLetters(
                model.date.toString(),
                model.numberLetters
            );
            if (existItemDate) {
                logger.error(
                    `TodayWordService create - Já existe uma palavra para a data informada. Model: ${JSON.stringify(
                        model
                    )}`
                );
                return buildResult(
                    false,
                    `Já existe uma palavra para a data ${formatDate(
                        model.date,
                        "pt-BR"
                    )} com o tamanho ${model.numberLetters} letras`
                );
            }
            const modelEntity = model as TodayWordModel;
            modelEntity.dateStr = model.date.toString();

            const result = await this.todayWordRepo.create(modelEntity);
            return result;
        } catch (err) {
            logger.error(
                "TodayWordService create - Exception: " +
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
    public async edit(model: TodayWordVO): Promise<ResultVO> {
        try {
            const existItemDate = await this.getByDateByNumberLetters(
                model.date.toString(),
                model.numberLetters
            );
            if (existItemDate && existItemDate != null && existItemDate._id != model._id) {
                logger.error(
                    `TodayWordService edit - Já existe uma palavra para a data informada. Model: ${JSON.stringify(
                        model
                    )}`
                );
                return buildResult(
                    false,
                    `Já existe uma palavra para a data ${model.date.toString()} com o tamanho ${
                        model.numberLetters
                    } letras`
                );
            }
            const modelEntity = model as TodayWordModel;
            modelEntity.dateStr = model.date.toString();

            const result = await this.todayWordRepo.edit(modelEntity);
            return result;
        } catch (err) {
            logger.error(
                "TodayWordService edit - Exception: " +
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
    public async getByDateByNumberLetters(
        date: string | String,
        numberLetters: number
    ): Promise<TodayWordVO> {
        try {
            const dateToStr = date;
            const modelEntity =
                await this.todayWordRepo.getByDateByNumberLetters(
                    dateToStr,
                    numberLetters
                );
            if (!modelEntity) {
                return null;
            }
            const response = modelEntity as TodayWordVO;
            return response;
        } catch (err) {
            logger.error(
                "TodayWordService getByDateByNumberLetters - Exception: " +
                    err +
                    ", Model: " +
                    date +
                    ", " +
                    numberLetters
            );
            return null;
        }
    }
    public async getAll(): Promise<TodayWordVO[]> {
        try {
            const modelEntity = await this.todayWordRepo.getAll();
            if (!modelEntity) {
                return null;
            }
            const response = modelEntity as TodayWordVO[];
            return response;
        } catch (err) {
            logger.error("TodayWordService getAll - Exception: " + err);
            return null;
        }
    }
}
