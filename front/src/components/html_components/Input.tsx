interface TextInputInterface {
  name: string;
  placeholder?: string;
  value: number;
  setValue: (number: number) => void;
}

function TextInput({ name, placeholder, value, setValue }: TextInputInterface) {
  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-2 max-w-[500px] w-full my-2"
    >
      <h3 className="text-xl font-bold">{name}</h3>
      <input
        className="p-3 border border-white rounded-md text-lg focus:outline-0 focus:border-2 focus:border-slate-400"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </label>
  );
}

export default TextInput;
