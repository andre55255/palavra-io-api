import { WordModel } from "../../config/database/models/word/WordModel";
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { WordRepositoryImpl } from "../../repositories/word/wordRepositoryImpl";
import { WordRepositoryInterface } from "../../repositories/word/wordRepositoryInterface";
import { FilterVO } from "../../view-objects/utils/FilterVO";
import { ResultVO } from "../../view-objects/utils/ResultVO";
import { WordVO } from "../../view-objects/word/WordVO";
import { WordServiceInterface } from "./wordServiceInterface";
import fs from "fs";

export class WordServiceImpl implements WordServiceInterface {
    private wordRepo: WordRepositoryInterface;

    constructor() {
        this.wordRepo = new WordRepositoryImpl();
    }
    public async readFileAndInsertWords(filepath: string): Promise<ResultVO> {
        try {
            let countWords = 0;
            const isExistFilepath = fs.existsSync(filepath);
            if (!isExistFilepath) {
                logger.error("Arquivo não encontrado no caminho: " + filepath);
                return buildResult(
                    false,
                    "Arquivo não encontrado no caminho: " + filepath
                );
            }
            fs.readFile(filepath, { encoding: "utf-8" }, (err, data) => {
                if (err) {
                    logger.error(
                        `Erro ao ler arquivo 'fs': ${err} no caminho ${filepath}`
                    );
                    throw new Error(
                        `Erro ao ler arquivo 'fs': ${err} no caminho ${filepath}`
                    );
                }
                const lines = data.split(/\r?\n/);
                lines.forEach(async (line) => {
                    const word: WordModel = {
                        text: line.toUpperCase(),
                        numberLetters: line.length
                    };
                    const exist = await this.getByText(word.text);
                    if (!exist) {
                        const result = await this.create(word);
                        if (!result || !result.success) {
                            throw new Error(result.message + "");
                        }
                        countWords++;
                    }
                });
            });
            return buildResult(true, "Palavras lidas e inseridas, quantidade: " + countWords);
        } catch (err) {
            logger.error(
                "WordService readFileAndInsertWords - Exception: " +
                    err +
                    ". filepath: " +
                    filepath
            );
            return buildResult(
                false,
                "Falha ao ler arquivo e inserir palavras: " + err
            );
        }
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
            return buildResult(false, "Falha inesperada ao editar palavra");
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
                "WordService getAll - Exception: " +
                    err +
                    ". Filtros: " +
                    filter
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
    F;
    public async remove(id: string): Promise<ResultVO> {
        try {
            const wordModel: WordModel = await this.wordRepo.getById(id);
            wordModel.disabledAt = new Date();
            const result = await this.wordRepo.edit(wordModel);
            return result;
        } catch (err) {
            logger.error("WordService remove - Exception: " + err);
            return null;
        }
    }
}
