interface ButtonInterface {
  name: string;
  onClick: () => void;
}

function Button({ name, onClick }: ButtonInterface) {
  return (
    <button
      className="bg-b1 rounded-md px-5 py-2 text-lg text-white font-semibold max-w-[500px] w-full uppercase hover:scale-105"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;
