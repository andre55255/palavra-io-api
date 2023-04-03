import { TodayWordModel } from "../../config/database/models/todayWord/TodayWordModel";
import { ResultVO } from "../../view-objects/utils/ResultVO";

export interface TodayWordRepositoryInterface {
    create(model: TodayWordModel): Promise<ResultVO>;

    edit(model: TodayWordModel): Promise<ResultVO>;

    getByDateByNumberLetters(date: string | String, numberLetters: number | Number): Promise<TodayWordModel>;

    getAll(): Promise<TodayWordModel[]>;
}