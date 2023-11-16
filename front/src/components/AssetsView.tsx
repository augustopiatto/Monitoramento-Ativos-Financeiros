import AssetsList from "./AssetsList";
import Button from "./html_components/Button";

function AssetsView() {
  const selectedAssets = [
    {
      id: 1,
      name: "Petro",
    },
    { id: 2, name: "MWL" },
    { id: 3, name: "B2W" },
    { id: 4, name: "AAA" },
    { id: 5, name: "BBB" },
    { id: 6, name: "CCC" },
    { id: 7, name: "DDD" },
    { id: 8, name: "EEE" },
    { id: 9, name: "FFF" },
    { id: 10, name: "GGG" },
  ];

  function handleClick() {
    console.log("consultar");
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center w-[400px] bg-slate-400 p-5">
      <Button name={"Consultar"} onClick={handleClick} />
      <h2 className="text-xl font-semibold">Ativos</h2>
      <AssetsList selectedAssets={selectedAssets} />
    </div>
  );
}

export default AssetsView;
