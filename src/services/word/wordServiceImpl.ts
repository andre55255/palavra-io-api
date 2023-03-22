import { WordModel } from "../../config/database/models/word/WordModel";
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { WordRepositoryImpl } from "../../repositories/word/wordRepositoryImpl";
import { WordRepositoryInterface } from "../../repositories/word/wordRepositoryInterface";
import { FilterVO } from "../../view-objects/utils/FilterVO";
import { ResultVO } from "../../view-objects/utils/ResultVO";
import { WordVO } from "../../view-objects/word/WordVO";
import { WordServiceInterface } from "./wordServiceInterface";

export class WordServiceImpl implements WordServiceInterface {
    private wordRepo: WordRepositoryInterface;

    constructor() {
        this.wordRepo = new WordRepositoryImpl();
    }

    public async readFileAndInsertWords(filepath: string): Promise<ResultVO> {
        throw new Error("Method not implemented.");
    }
    public async create(word: WordVO): Promise<ResultVO> {
        try {
            const existItemText = await this.wordRepo.getByText(word.text);
            if (existItemText) {
                logger.error(
                    `WordService create - Já existe uma palavra com o texto informado. Model: ${word}`
                );
                return buildResult(
                    false,
                    `Já existe uma palavra com o texto ${word.text}`
                );
            }
            const modelEntity = word as WordModel;
            const result = await this.wordRepo.create(modelEntity);
            return result;
        } catch (err) {
            logger.error(
                "WordService create - Exception: " + err + ". Model: " + word
            );
            return buildResult(false, "Falha inesperada ao criar palavra");
        }
    }
    public async createMany(words: WordVO[]): Promise<ResultVO> {
        try {
            const modelEntity = words as WordModel[];
            const result = await this.wordRepo.createMany(modelEntity);
            return result;
        } catch (err) {
            logger.error(
                "WordService createMany - Exception: " +
                    err +
                    ". Quantidade: " +
                    words.length
            );
            return buildResult(false, "Falha inesperada ao criar palavras");
        }
    }
    public async edit(word: WordVO): Promise<ResultVO> {
        try {
            const existItemToken = await this.wordRepo.getByText(word.text);
            if (existItemToken && word._id != existItemToken._id) {
                logger.error(
                    `WordService edit - Já existe uma palavra com o texto informado. Model: ${word}`
                );
                return buildResult(
                    false,
                    `Já existe uma configuração com o texto ${word.text}`
                );
            }
            const modelEntity = word as WordModel;
            const result = await this.wordRepo.edit(modelEntity);
            return result;
        } catch (err) {
            logger.error(
                "WordService edit - Exception: " + err + ". Model: " + word
            );
            return buildResult(
                false,
                "Falha inesperada ao editar palavra"
            );
        }
    }
    public async getById(id: string): Promise<WordVO> {
        try {
            const modelEntity = await this.wordRepo.getById(id);
            if (!modelEntity) {
                return null;
            }
            const response = modelEntity as WordVO;
            return response;
        } catch (err) {
            logger.error(
                "WordService getById - Exception: " + err + ". Id: " + id
            );
            return null;
        }
    }
    public async getAll(filter?: FilterVO): Promise<WordVO[]> {
        try {
            const modelEntity = await this.wordRepo.getAll(filter);
            if (!modelEntity) {
                return null;
            }
            const response = modelEntity as WordVO[];
            return response;
        } catch (err) {
            logger.error(
                "WordService getAll - Exception: " + err + ". Filtros: " + filter
            );
            return null;
        }
    }
    public async getByText(text: string): Promise<WordVO> {
        try {
            const modelEntity = await this.wordRepo.getByText(text);
            if (!modelEntity) {
                return null;
            }
            const response = modelEntity as WordVO;
            return response;
        } catch (err) {
            logger.error(
                "WordService getByText - Exception: " + err + ". Text: " + text
            );
            return null;
        }
    }
}
