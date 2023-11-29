import React from "react";
import api from "../../api/api";
import { getErrorMessage } from "../../helpers/helpers";
import { FunnelInterface } from "../../interfaces/ItemInterface";
import { FunnelsContext } from "../../contexts/FunnelsContext";

interface TagInterface {
  funnel: FunnelInterface;
}

function Tag({ funnel }: TagInterface) {
  const { allAssets, funnels, setFunnels, filterNotSelectedAssets } =
    React.useContext(FunnelsContext);

  async function removeFunnel(funnel: FunnelInterface) {
    const params = { id: funnel.id };
    try {
      await api.postRemoveFunnel(params);
    } catch (error) {
      const message = getErrorMessage(error);
      window.alert(`Não foi possível remover o ativo, ${message}`);
      return;
    }
    const filteredFunnels = funnels.filter((fun) => fun.name != funnel.name);
    setFunnels(filteredFunnels);
    filterNotSelectedAssets(allAssets, filteredFunnels);
  }

  return (
    <div className="bg-g1 w-fit rounded-lg p-3 flex items-start gap-5">
      <div className="flex-1">
        <p className="font-semibold">{funnel.name}</p>
        <p className="font-semibold">{funnel.periodicity} min</p>
        <p className="font-semibold">R$ {funnel.max_value}</p>
        <p className="font-semibold">R$ {funnel.min_value}</p>
      </div>
      <button onClick={() => removeFunnel(funnel)}>
        <span className="font-bold">X</span>
      </button>
    </div>
  );
}

export default Tag;
