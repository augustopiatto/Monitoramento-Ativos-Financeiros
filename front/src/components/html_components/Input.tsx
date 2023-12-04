import React from "react";
import { ValidatorInterface, allRules } from "../../helpers/rules";
import { getErrorMessage } from "../../helpers/helpers";

interface TextInputInterface {
  name: string;
  placeholder?: string;
  value: number | "";
  setValue: (number: number) => void;
  rules?: string[];
}

function Input({
  name,
  placeholder,
  value,
  setValue,
  rules,
}: TextInputInterface) {
  const [errors, setErrors] = React.useState<string[]>([]);

  function applyRulesAndValue(event: React.ChangeEvent<HTMLInputElement>) {
    const number = Number(event.target.value);
    const validationErrors: string[] = [];
    if (rules && rules.length) {
      rules.forEach((rule) => {
        const currentValidator = allRules[rule as keyof ValidatorInterface];
        try {
          const value = currentValidator ? currentValidator(number) : null;
          if (typeof value === "number") setValue(value);
        } catch (error) {
          const message = getErrorMessage(error);
          validationErrors.push(message);
        }
      });
      setErrors(validationErrors);
    } else {
      setValue(number);
    }
  }

  return (
    <>
      <label
        htmlFor={name}
        className="flex flex-col gap-2 max-w-[500px] w-full my-2"
      >
        <h3 className="text-xl font-bold">{name}</h3>
        <input
          data-testid="input"
          className="p-3 border border-white rounded-md text-lg focus:outline-0 focus:border-2 focus:border-slate-400"
          name={name}
          placeholder={placeholder}
          type="number"
          value={value}
          onChange={applyRulesAndValue}
        />
      </label>
      {errors &&
        !!errors.length &&
        errors.map((error) => <p key={error}>{error}</p>)}
    </>
  );
}

export default Input;
