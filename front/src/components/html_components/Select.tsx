import AssetInterface from "../../interfaces/ItemInterface";

interface SelectInterface {
  items: AssetInterface[];
  name: string;
  placeholder: string;
  setValue: (value: number) => void;
}

function Select({ items, name, placeholder, setValue }: SelectInterface) {
  function handleChange(event: Event) {
    if (event && event.target) {
      setValue(Number((event.target as HTMLButtonElement).value));
    }
  }

  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-2 max-w-[500px] w-full my-2"
    >
      <h3 className="text-xl font-bold">{name}</h3>
      <select
        className="p-2 border border-white rounded-md focus:outline-0 focus:border-2 focus:border-slate-400"
        name={name}
        defaultValue="default"
        placeholder={placeholder}
        onChange={() => handleChange}
      >
        <option value="default" disabled hidden>
          {placeholder}
        </option>
        {items &&
          items.length &&
          items.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
      </select>
    </label>
  );
}

export default Select;
