import { AssetInterface } from "../../interfaces/ItemInterface";

interface SelectInterface {
  items: AssetInterface[];
  name: string;
  placeholder: string;
  setValue: (value: string) => void;
}

function Select({ items, name, placeholder, setValue }: SelectInterface) {
  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-2 max-w-[500px] w-full my-2"
    >
      <h3 className="text-xl font-bold">{name}</h3>
      <select
        data-testid="select"
        className="p-3 border border-white rounded-md text-lg focus:outline-0 focus:border-2 focus:border-slate-400 [&>*]:text-lg [&>*]:h-10"
        name={name}
        defaultValue="default"
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
      >
        <option value="default" hidden>
          {placeholder}
        </option>
        {items &&
          !!items.length &&
          items.map((item) => (
            <option value={item.name} key={item.name}>
              {item.name}
            </option>
          ))}
      </select>
    </label>
  );
}

export default Select;
