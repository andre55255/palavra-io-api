import { ConfigModel } from "../../config/database/models/config/ConfigModel";
import { buildResult } from "../../helpers/staticMethods";
import logger from "../../middlewares/logger";
import { ConfigRepositoryImpl } from "../../repositories/config/configRepositoryImpl";
import { configRepositoryInterface } from "../../repositories/config/configRepositoryInterface";
import { ConfigVO } from "../../view-objects/config/configVO";
import { ResultVO } from "../../view-objects/utils/ResultVO";
import { ConfigServiceInterface } from "./configServiceInterface";

export class ConfigServiceImpl implements ConfigServiceInterface {
    private configRepo: configRepositoryInterface;

    constructor() {
        this.configRepo = new ConfigRepositoryImpl();
    }

    public async create(config: ConfigVO): Promise<ResultVO> {
        try {
            const existItemToken = await this.configRepo.getByToken(
                config.token
            );
            if (existItemToken) {
                logger.error(
                    `ConfigService create - Já existe uma configuração com o token informado. Model: ${config}`
                );
                return buildResult(
                    false,
                    `Já existe uma configuração com o token ${config.token}`
                );
            }
            const modelEntity = config as ConfigModel;
            const result = await this.configRepo.create(modelEntity);
            return result;
        } catch (err) {
            logger.error(
                "ConfigService create - Exception: " +
                    err +
                    ". Config: " +
                    config
            );
            return buildResult(false, "Falha inesperada ao criar configuração");
        }
    }
    public async edit(config: ConfigVO): Promise<ResultVO> {
        try {
            const existItemToken = await this.configRepo.getByToken(
                config.token
            );
            if (existItemToken && config._id != existItemToken._id) {
                logger.error(
                    `ConfigService edit - Já existe uma configuração com o token informado. Model: ${config}`
                );
                return buildResult(
                    false,
                    `Já existe uma configuração com o token ${config.token}`
                );
            }
            const modelEntity = config as ConfigModel;
            const result = await this.configRepo.edit(modelEntity);
            return result;
        } catch (err) {
            logger.error(
                "ConfigService edit - Exception: " + err + ". Config: " + config
            );
            return buildResult(false, "Falha inesperada ao editar configuração");
        }
    }
    public async getById(id: string): Promise<ConfigVO> {
        try {
            const modelEntity = await this.configRepo.getById(id);
            if (!modelEntity) {
                return null;
            }
            const response = modelEntity as ConfigVO;
            return response;
        } catch (err) {
            logger.error(
                "ConfigService getById - Exception: " + err + ". Id: " + id
            );
            return null;
        }
    }
    public async getByToken(token: string): Promise<ConfigVO> {
        try {
            const modelEntity = await this.configRepo.getByToken(token);
            if (!modelEntity) {
                return null;
            }
            const response = modelEntity as ConfigVO;
            return response;
        } catch (err) {
            logger.error(
                "ConfigService getByToken - Exception: " + err + ". Token: " + token
            );
            return null;
        }
    }
    public async getAll(): Promise<ConfigVO[]> {
        try {
            const modelEntity = await this.configRepo.getAll();
            if (!modelEntity) {
                return null;
            }
            const response = modelEntity as ConfigVO[];
            return response;
        } catch (err) {
            logger.error(
                "ConfigService getAll - Exception: " + err
            );
            return null;
        }
    }
    public async remove(id: string): Promise<ResultVO> {
        try {
            const result = await this.configRepo.remove(id);
            return result;
        } catch (err) {
            logger.error(
                "ConfigService remove - Exception: " + err
            );
            return null;
        }
    }
}
