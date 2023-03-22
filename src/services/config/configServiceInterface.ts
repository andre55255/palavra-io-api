import { ConfigVO } from "../../view-objects/config/configVO";
import { ResultVO } from "../../view-objects/utils/ResultVO";

export interface ConfigServiceInterface {
    create(config: ConfigVO): Promise<ResultVO>;

    edit(config: ConfigVO): Promise<ResultVO>;

    getById(id: string): Promise<ConfigVO>;

    getByToken(token: string): Promise<ConfigVO>;

    getAll(): Promise<ConfigVO[]>;

    remove(id: string): Promise<ResultVO>;
}
