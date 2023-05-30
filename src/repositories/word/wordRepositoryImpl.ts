import { WordModel } from "../../config/database/models/word/WordModel";
import logger from "../../middlewares/logger";
import { FilterVO } from "../../view-objects/utils/FilterVO";
import { ResultVO } from "../../view-objects/utils/ResultVO";
import { WordRepositoryInterface } from "./wordRepositoryInterface";
import dbWord from "../../config/database/models/word/Word";
import { buildResult } from "../../helpers/staticMethods";

export class WordRepositoryImpl implements WordRepositoryInterface {
    public async create(word: WordModel): Promise<ResultVO> {
        try {
            word.text = word.text.toUpperCase();
            const modelCreated = await dbWord.create(word);
            if (modelCreated._id) {
                logger.info(
                    "WordRepository create - Palavra criada com sucesso: " +
                        JSON.stringify(modelCreated)
                );
                return buildResult(
                    true,
                    "Palavra criada com sucesso",
                    modelCreated
                );
            }
            logger.error(
                "WordRepository create - Falha ao inserir palavra na base de dados: " +
                    JSON.stringify(modelCreated)
            );
            return buildResult(
                false,
                "Falha ao inserir palavra na base de dados"
            );
        } catch (err) {
            logger.error(
                "WordRepository create - Exception: " + err + ". Model: " + JSON.stringify(word)
            );
            return buildResult(false, "Falha inesperada ao criar palavra");
        }
    }
    public async createMany(words: WordModel[]): Promise<ResultVO> {
        try {
            const modelCreated = await dbWord.insertMany(words);
            if (modelCreated && modelCreated.length) {
                logger.info(
                    "WordRepository createMany - Quantidade de palavras criadas com sucesso: " +
                        modelCreated.length
                );
                return buildResult(
                    true,
                    "Palavras criadas com sucesso, quantidade " +
                        modelCreated.length
                );
            }
            logger.error(
                "WordRepository createMany - Falha ao inserir palavras na base de dados, quantidade: " +
                    modelCreated.length
            );
            return buildResult(
                false,
                "Falha ao inserir palavras na base de dados"
            );
        } catch (err) {
            logger.error(
                "WordRepository createMany - Exception: " +
                    err +
                    ". Quantidade: " +
                    words.length
            );
            return buildResult(false, "Falha inesperada ao criar palavras");
        }
    }
    public async edit(word: WordModel): Promise<ResultVO> {
        try {
            word.text = word.text.toUpperCase();
            const modelSave = await this.getById(word._id);
            if (!modelSave) {
                logger.error(
                    `WordRepository edit - Palavra não encontrada. Model: ${word._id} - ${word.text}`
                );
                return buildResult(false, "Palavra não encontrada");
            }
            const result = await dbWord.updateOne({ _id: word._id }, word);
            if (!result || !result.modifiedCount) {
                logger.error(
                    `WordRepository edit - Falha ao editar palavra. Model:  ${word._id} - ${word}`
                );
                return buildResult(
                    false,
                    "Falha ao editar palavra na base de dados"
                );
            }
            logger.info("WordRepository edit - Palavra editada com sucesso");
            return buildResult(true, "Palavra editada com sucesso");
        } catch (err) {
            logger.error(
                "WordRepository edit - Exception: " + err + ". Model: " + word
            );
            return buildResult(false, "Falha inesperada ao editar palavra");
        }
    }
    public async getById(id: string): Promise<WordModel> {
        try {
            const modelSave = await dbWord.findOne({
                _id: id,
                disabledAt: null,
            });
            if (!modelSave) {
                logger.error(
                    `WordRepository getById - Palavra não encontrada com o _id: ${id}`
                );
                return null;
            }
            return modelSave;
        } catch (err) {
            logger.error(
                "WordRepository getById - Exception: " + err + ". Id: " + id
            );
            return null;
        }
    }
    public async getAll(filter?: FilterVO): Promise<WordModel[]> {
        try {
            let modelSave: WordModel[];
            if (!filter) {
                logger.info("wordRepository getAll - Buscando todos os registros de palavras sem filtro")
                
                modelSave = await dbWord.find({ disabledAt: null });
            } else if (filter.limit && filter.page && filter.numberLetter) {
                logger.info("wordRepository getAll - Buscando todos os registros filtrados: " + filter);
                
                const skip = filter.limit * (filter.page - 1);
                modelSave = await dbWord
                    .find({ disabledAt: null, numberLetters: filter.numberLetter })
                    .skip(skip)
                    .limit(filter.limit);
            }
            else if (filter.limit && filter.page) {
                logger.info("wordRepository getAll - Buscando todos os registros filtrados: " + filter);

                const skip = filter.limit * (filter.page - 1);
                modelSave = await dbWord
                    .find({ disabledAt: null })
                    .skip(skip)
                    .limit(filter.limit);
            }
            else {
                logger.error("wordRepository getAll - Filtro inconsistente: " + filter);
                return null;
            }
            if (!modelSave) {
                logger.error(
                    `WordRepository getAll - Palavras não encontradas`
                );
                return null;
            }
            return modelSave;
        } catch (err) {
            logger.error("WordRepository getAll - Exception: " + err);
            return null;
        }
    }
    public async getByText(text: string): Promise<WordModel> {
        try {
            const modelSave = await dbWord.findOne({ text, disabledAt: null });
            if (!modelSave) {
                logger.error(
                    `WordRepository getByText - Palavra não encontrada com o text: ${text}`
                );
                return null;
            }
            return modelSave;
        } catch (err) {
            logger.error(
                "WordRepository getByText - Exception: " +
                    err +
                    ". Text: " +
                    text
            );
            return null;
        }
    }
}
