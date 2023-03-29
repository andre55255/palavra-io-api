import { FilterVO } from "../../view-objects/utils/FilterVO";
import { ResultVO } from "../../view-objects/utils/ResultVO";
import { WordVO } from "../../view-objects/word/WordVO";

export interface WordServiceInterface {
    readFileAndInsertWords(filepath: string): Promise<ResultVO>;

    create(word: WordVO): Promise<ResultVO>;

    createMany(words: Array<WordVO>): Promise<ResultVO>;

    edit(word: WordVO): Promise<ResultVO>;

    getById(id: string): Promise<WordVO>;

    getAll(filter?: FilterVO): Promise<Array<WordVO>>;

    getByText(text: string): Promise<WordVO>;

    remove(id: string): Promise<ResultVO>;
}