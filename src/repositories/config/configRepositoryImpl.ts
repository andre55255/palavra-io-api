import { ConfigModel } from "../../config/database/models/config/ConfigModel";
import { ResultVO } from "../../view-objects/utils/ResultVO";
import { configRepositoryInterface } from "./configRepositoryInterface";
import logger from "../../middlewares/logger";
import dbConfig from "../../config/database/models/config/Config";
import { buildResult } from "../../helpers/staticMethods";

export class ConfigRepositoryImpl implements configRepositoryInterface {
    public async create(config: ConfigModel): Promise<ResultVO> {
        try {
            const configCreated = await dbConfig.create(config);
            if (configCreated._id) {
                logger.info(
                    "ConfigRepository create - Configuração criada com sucesso: " +
                        config
                );
                return buildResult(
                    true,
                    "Configuração criada com sucesso",
                    configCreated
                );
            }
            logger.error(
                "ConfigRepository create - Falha ao inserir configuração na base de dados: " +
                    config
            );
            return buildResult(
                false,
                "Falha ao inserir configuração na base de dados"
            );
        } catch (err) {
            logger.error(
                "ConfigRepository create - Exception: " +
                    err +
                    ". Config: " +
                    config
            );
            return buildResult(false, "Falha inesperada ao criar configuração");
        }
    }
    public async edit(config: ConfigModel): Promise<ResultVO> {
        try {
            const configSave = await this.getById(config._id);
            if (!configSave) {
                logger.error(
                    `ConfigRepository edit - Configuração não encontrada. Model: ${config}`
                );
                return buildResult(false, "Configuração não encontrada");
            }
            const result = await dbConfig.updateOne(
                { _id: config._id },
                config
            );
            if (!result || !result.modifiedCount) {
                logger.error(
                    `ConfigRepository edit - Falha ao editar configuração. Model: ${config}`
                );
                return buildResult(
                    false,
                    "Falha ao editar configuração na base de dados"
                );
            }
            logger.info(
                "ConfigRepository edit - Configuração editada com sucesso"
            );
            return buildResult(true, "Configuração editada com sucesso");
        } catch (err) {
            logger.error(
                "ConfigRepository edit - Exception: " +
                    err +
                    ". Config: " +
                    config
            );
            return buildResult(
                false,
                "Falha inesperada ao editar configuração"
            );
        }
    }
    public async getById(id: string): Promise<ConfigModel> {
        try {
            const configSave = await dbConfig.findOne({ _id: id });
            if (!configSave) {
                logger.error(
                    `ConfigRepository getById - Configuração não encontrada com o _id: ${id}`
                );
                return null;
            }
            return configSave;
        } catch (err) {
            logger.error(
                "ConfigRepository getById - Exception: " +
                    err +
                    ". Id da Config: " +
                    id
            );
            return null;
        }
    }
    public async getByToken(token: string): Promise<ConfigModel> {
        try {
            const configSave = await dbConfig.findOne({ token });
            if (!configSave) {
                logger.error(
                    `ConfigRepository getByToken - Configuração não encontrada com o token: ${token}`
                );
                return null;
            }
            return configSave;
        } catch (err) {
            logger.error(
                "ConfigRepository getByToken - Exception: " +
                    err +
                    ". Token da Config: " +
                    token
            );
            return null;
        }
    }
    public async getAll(): Promise<ConfigModel[]> {
        try {
            const configsSave = await dbConfig.find();
            if (!configsSave) {
                logger.error(
                    `ConfigRepository getAll - Nenhuma configuração encontrada`
                );
                return null;
            }
            return configsSave;
        } catch (err) {
            logger.error("ConfigRepository getAll - Exception: " + err);
            return null;
        }
    }
    public async remove(id: string): Promise<ResultVO> {
        try {
            const configSave = await this.getById(id);
            if (!configSave) {
                logger.error(
                    `ConfigRepository remove - Configuração não encontrada. Id: ${id}`
                );
                return buildResult(false, "Configuração não encontrada");
            }
            const result = await dbConfig.deleteOne({ _id: id });
            if (!result || !result.deletedCount) {
                logger.error(
                    `ConfigRepository remove - Falha ao remover configuração. Model: ${configSave}`
                );
                return buildResult(
                    false,
                    "Falha ao remover configuração na base de dados"
                );
            }
            logger.info(
                "ConfigRepository remove - Configuração removida com sucesso. Config: " +
                    configSave
            );
            return buildResult(true, "Configuração removida com sucesso");
        } catch (err) {
            logger.error(
                "ConfigRepository remove - Exception: " +
                    err +
                    ". Id da Config: " +
                    id
            );
            return buildResult(
                false,
                "Falha inesperada ao remover configuração"
            );
        }
    }
}
