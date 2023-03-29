import { check } from "express-validator";

export const validationWord = [
    check("text")
        .notEmpty()
        .withMessage("Texto não informado")
        .isString()
        .withMessage("Texto inválido")
        .isLength({ min: 2, max: 70 })
        .withMessage("Texto deve ter entre 2 e 70 caracteres"),
    check("numberLetters")
        .notEmpty()
        .withMessage("Número de letras não informado")
        .isNumeric()
        .withMessage("Número de letras informado inválido")
]