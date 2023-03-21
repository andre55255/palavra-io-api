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