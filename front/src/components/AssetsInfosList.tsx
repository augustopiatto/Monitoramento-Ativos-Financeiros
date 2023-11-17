import { AssetInfos } from "../interfaces/ItemInterface";
import Dialog from "./Dialog";

interface AssetsInfosListInterface {
  assetsInfos: AssetInfos[];
}

function AssetsInfosList({ assetsInfos }: AssetsInfosListInterface) {
  return (
    <Dialog>
      {assetsInfos &&
        !!assetsInfos.length &&
        assetsInfos.map((asset) => (
          <div>
            <h1>{asset.name}</h1>
            <p>{asset.cur_value}</p>
          </div>
        ))}
    </Dialog>
  );
}

export default AssetsInfosList;
