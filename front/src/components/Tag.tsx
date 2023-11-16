interface TagInterface {
  name: string;
}

function Tag({ name }: TagInterface) {
  return (
    <div className="bg-slate-500 rounded-lg p-3">
      <span className="font-semibold">{name}</span>
    </div>
  );
}

export default Tag;
