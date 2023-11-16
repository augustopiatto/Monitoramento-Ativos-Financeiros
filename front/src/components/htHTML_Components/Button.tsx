interface ButtonInterface {
  name: string;
}

function Button({ name }: ButtonInterface) {
  return (
    <button className="bg-slate-600 rounded-md px-5 py-2 text-lg font-semibold max-w-[500px] w-full uppercase hover:scale-105">
      {name}
    </button>
  );
}

export default Button;
