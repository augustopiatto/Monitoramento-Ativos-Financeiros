import AssetInterface from "../interfaces/ItemInterface";

interface AssetsListInterface {
  selectedAssets: AssetInterface[];
}

function AssetsList({ selectedAssets }: AssetsListInterface) {
  return (
    <div className="flex justify-center">
      <div className="flex w-10/12 bg-slate-100 rounded overflow-auto">
        {selectedAssets &&
          selectedAssets.length &&
          selectedAssets.map((asset) => (
            <span className="grow" key={asset.id}>
              {asset.id}
            </span>
          ))}
      </div>
    </div>
  );
}

export default AssetsList;
