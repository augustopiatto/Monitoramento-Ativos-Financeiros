import { AssetInfos } from "../interfaces/ItemInterface";
import Dialog from "./ui_components/Dialog";
import Divider from "./ui_components/Divider";

interface AssetsPricesListInterface {
  assetsPrices: AssetInfos[];
  opened: boolean;
  setOpened: (value: boolean) => void;
}

function AssetsPricesList({
  assetsPrices,
  opened,
  setOpened,
}: AssetsPricesListInterface) {
  return (
    <Dialog opened={opened} setOpened={setOpened}>
      {assetsPrices.map((asset) => (
        <div className="flex flex-col gap-3" key={asset.name}>
          <h1 className="text-2xl">
            <span className="text-xl font-semibold">Ativo: </span>
            <span>{asset.name}</span>
          </h1>
          <p className="inline text-xl">
            <span className="font-semibold">Valor atual: </span>
            <span>R$ {asset.cur_value}</span>
          </p>
          <Divider />
        </div>
      ))}
    </Dialog>
  );
}

export default AssetsPricesList;
