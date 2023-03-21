import { ConfigModel } from "../../config/database/models/config/ConfigModel";
import { ResultVO } from "../../view-objects/utils/ResultVO";

export interface configRepositoryInterface {
    create(config: ConfigModel): Promise<ResultVO>;

    edit(config: ConfigModel): Promise<ResultVO>;

    getById(id: string): Promise<ConfigModel>;

    getAll(): Promise<Array<ConfigModel> | null>;

    remove(id: string): Promise<ResultVO>;
}
