import { check } from "express-validator";

export const validationConfig = [
    check("token")
        .notEmpty()
        .withMessage("Token não informado")
        .isString()
        .withMessage("Token inválido")
        .isLength({ min: 2, max: 70 })
        .withMessage("Token deve ter entre 2 e 70 caracteres"),
    check("value")
        .notEmpty()
        .withMessage("Valor não informado")
        .isString()
        .withMessage("Valor inválido")
        .isLength({ min: 2, max: 256 })
        .withMessage("Valor deve ter entre 2 e 256 caracteres")
]