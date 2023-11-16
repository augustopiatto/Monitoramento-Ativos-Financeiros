import AssetInterface from "../interfaces/ItemInterface";
import Tag from "./Tag";

interface AssetsListInterface {
  selectedAssets: AssetInterface[];
}

function AssetsList({ selectedAssets }: AssetsListInterface) {
  return (
    <div className="flex justify-center max-h-[500px]">
      <div className="flex flex-wrap justify-center gap-3 w-10/12 bg-slate-100 rounded p-2 overflow-y-auto">
        {selectedAssets &&
          selectedAssets.length &&
          selectedAssets.map((asset) => (
            <Tag name={asset.name} key={asset.id} />
          ))}
      </div>
    </div>
  );
}

export default AssetsList;
