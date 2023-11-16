import AssetInterface from "../../interfaces/ItemInterface";

interface SelectInterface {
  items: AssetInterface[];
  name: string;
  placeholder: string;
  value: AssetInterface;
  setValue: (value: AssetInterface) => void;
}

function Select({
  items,
  name,
  placeholder,
  value,
  setValue,
}: SelectInterface) {
  function handleChange(event) {
    console.log(event);
  }

  return (
    <label htmlFor={name} className="flex flex-col gap-2 max-w-[500px] my-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <select
        className="p-2 border border-white rounded-md focus:outline-0 focus:border-2 focus:border-slate-400"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      >
        {items &&
          items.length &&
          items.map((item) => <option value={item.name} key={item.id} />)}
      </select>
    </label>
  );
}

export default Select;
