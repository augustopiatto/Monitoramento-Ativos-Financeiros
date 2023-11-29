import React from "react";
import { FunnelsContext } from "../contexts/FunnelsContext";
import Tag from "./ui_components/Tag";

function AssetsList() {
  const { funnels } = React.useContext(FunnelsContext);

  return (
    <div className="w-10/12 h-assetslist rounded-md p-2 flex flex-wrap justify-center content-start gap-3 overflow-y-auto">
      {funnels &&
        !!funnels.length &&
        funnels.map((funnel) => <Tag funnel={funnel} key={funnel.name} />)}
    </div>
  );
}

export default AssetsList;
