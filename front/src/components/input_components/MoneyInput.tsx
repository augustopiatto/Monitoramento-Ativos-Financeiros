interface MoneyInputInterface {
  name: string;
  value: number | "";
  setValue: (value: number) => void;
}

function MoneyInput({ name, value, setValue }: MoneyInputInterface) {
  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-2 max-w-[500px] w-full my-2"
    >
      <h3 className="text-xl font-bold">{name}</h3>
      <input
        data-testid="money-input"
        className="p-3 border border-white rounded-md text-lg focus:outline-0 focus:border-2 focus:border-slate-400"
        name={name}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </label>
  );
}

export default MoneyInput;
