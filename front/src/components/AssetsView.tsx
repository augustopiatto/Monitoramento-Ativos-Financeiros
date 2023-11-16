import AssetsList from "./AssetsList";
import Button from "./htHTML_Components/Button";

function AssetsView() {
  const selectedAssets = [
    {
      id: 1,
      name: "Petro",
    },
    { id: 2, name: "MWL" },
  ];

  function handleClick() {
    console.log("consultar");
  }

  return (
    <div className="flex flex-col gap-3 w-[400px] bg-slate-400 p-5">
      <Button name={"Consultar"} onClick={handleClick} />
      <h2 className="text-xl font-semibold">Ativos</h2>
      <AssetsList selectedAssets={selectedAssets} />
    </div>
  );
}

export default AssetsView;
