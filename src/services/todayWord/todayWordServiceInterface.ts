import { ResultVO } from './../../view-objects/utils/ResultVO';
import { TodayWordVO } from "../../view-objects/todayWord/TodayWordVO";

export interface TodayWordServiceInterface {
    create(model: TodayWordVO): Promise<ResultVO>;

    edit(model: TodayWordVO): Promise<ResultVO>;

    getByDateByNumberLetters(date: string | String, numberLetters: number): Promise<TodayWordVO>;

    getAll(): Promise<TodayWordVO[]>;
}