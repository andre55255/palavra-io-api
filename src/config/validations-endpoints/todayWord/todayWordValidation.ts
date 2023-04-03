import { check } from "express-validator";

export const validationTodayWord = [
    check("date")
        .notEmpty()
        .withMessage("Data não informada")
        .custom((val) => {
            try {
                new Date(val);
                return true;
            } catch (err) {
                return false;
            }
        })
        .withMessage("Data inválida"),
    check("value")
        .notEmpty()
        .withMessage("Palavra não informada")
        .isString()
        .withMessage("Palavra inválida"),
    check("numberLetters")
        .notEmpty()
        .withMessage("Número de letras não informado")
        .isNumeric()
        .withMessage("Número de letras informado inválido")
]