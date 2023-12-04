interface ValidatorInterface {
  [key: string]: (value: string | number) => string | number;
}

export const allRules: ValidatorInterface = {
  validNumber: (number) => {
    if (typeof number === "number" && number >= 0) return number;
    throw new Error("Não é um número");
  },
};
