import { WordModel } from "../../config/database/models/word/WordModel";
import { FilterVO } from "../../view-objects/utils/FilterVO";
import { ResultVO } from "../../view-objects/utils/ResultVO";

export interface WordRepositoryInterface {
    create(word: WordModel): Promise<ResultVO>;

    createMany(words: Array<WordModel>): Promise<ResultVO>;

    edit(word: WordModel): Promise<ResultVO>;

    getById(id: string): Promise<WordModel>;

    getAll(filter?: FilterVO): Promise<Array<WordModel>>;

    getByText(text: string): Promise<WordModel>;
}
