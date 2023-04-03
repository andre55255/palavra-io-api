import logger from "../middlewares/logger";
import { ApiResponseVO } from "../view-objects/utils/ApiResponseVO";
import { ResultVO } from "../view-objects/utils/ResultVO";

export function buildApiResponse(
    success: Boolean,
    statusCode: number,
    message?: String | any,
    object?: Object | null
): ApiResponseVO {
    const apiResponse: ApiResponseVO = {
        success,
        statusCode,
        message,
        object,
    };

    return apiResponse;
}

export function buildResult(
    success: Boolean,
    message: String,
    object?: Object | null
): ResultVO {
    const resultDto: ResultVO = {
        success,
        message,
        object,
    };

    return resultDto;
}

export function formatDate(date: Date, format: "pt-BR" | "en-US"): string {
    try {
        if (format === "pt-BR") {
            return date.toLocaleDateString("pt-BR");
        } else if (format === "en-US") {
            return date.toLocaleDateString("en-US");
        } else {
            return date.toDateString();
        }
    } catch (err) {
        logger.error("StaticMethods formatDate - Falha inesperada ao formatar a data: " + date + "err: " + err);
        throw new Error("Falha inesperada ao formatar data");
    }
}