interface TagInterface {
  name: string;
}

function Tag({ name }: TagInterface) {
  function handleClick() {
    console.log("fechar");
  }

  return (
    <div className="bg-bw rounded-lg p-3 flex items-start gap-3">
      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        <p className="font-semibold">{name}</p>
        <p className="font-semibold">{name}</p>
        <p className="font-semibold">{name}</p>
      </div>
      <button onClick={handleClick}>
        <span className="font-bold">X</span>
      </button>
    </div>
  );
}

export default Tag;
