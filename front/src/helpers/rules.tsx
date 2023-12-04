export interface ValidatorInterface {
  [key: string]: (value: string | number) => string | number;
}

export const allRules: ValidatorInterface = {
  validNumber: (number) => {
    if (typeof number === "number" && number >= 0) return number;
    throw new Error("Não é um número");
  },
  maxLength: (number) => {
    if (String(number).length <= 8) return number;
    throw new Error("Número muito grande. Coloque menos que 8 dígitos");
  },
};
