import { AssetInfos } from "../interfaces/ItemInterface";
import Dialog from "./Dialog";

interface AssetsInfosListInterface {
  assetsInfos: AssetInfos[];
  opened: boolean;
  setOpened: (value: boolean) => void;
}

function AssetsInfosList({
  assetsInfos,
  opened,
  setOpened,
}: AssetsInfosListInterface) {
  if (assetsInfos && !!assetsInfos.length)
    return (
      <Dialog opened={opened} setOpened={setOpened}>
        {assetsInfos.map((asset) => (
          <div>
            <h1>{asset.name}</h1>
            <p>{asset.cur_value}</p>
          </div>
        ))}
      </Dialog>
    );
}

export default AssetsInfosList;
