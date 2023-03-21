import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { buildApiResponse } from "../helpers/staticMethods";

export const validationRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schemaErrors = validationResult(req);
    if (!schemaErrors.isEmpty()) {
        const message = schemaErrors
            .array({ onlyFirstError: true })
            .map((err) => {
                return err.msg;
            })
            .join(",");

        return res.status(400).json(buildApiResponse(false, 400, message));
    }

    next();
};
