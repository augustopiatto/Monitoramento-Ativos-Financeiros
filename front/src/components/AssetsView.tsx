import AssetsList from "./AssetsList";
import Button from "./html_components/Button";

function AssetsView() {
  function handleClick() {
    console.log("consultar");
  }

  return (
    <div className="flex flex-col gap-5 items-center w-[400px] bg-g1 p-5">
      <Button name={"Consultar"} onClick={handleClick} />
      <h2 className="text-xl font-semibold">Ativos selecionados</h2>
      <AssetsList />
    </div>
  );
}

export default AssetsView;
