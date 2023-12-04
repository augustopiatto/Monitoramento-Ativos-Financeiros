interface ButtonInterface {
  name: string;
  secondary?: boolean;
  onClick: () => void;
}

function Button({ name, onClick, secondary }: ButtonInterface) {
  const bgColor = secondary ? `bg-lb3` : `bg-b1`;
  const textColor = secondary ? `text-black` : `text-white`;

  return (
    <button
      data-testid="button"
      className={`${bgColor} ${textColor} rounded-lg px-5 py-4 text-lg font-semibold max-w-[500px] w-full uppercase shadow-md shadow-gray hover:scale-105`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;
