import { clone } from "../_shared";
import { mockAssets } from "./mock";
import type { Asset, AssetType } from "./types";

const store: Asset[] = clone(mockAssets);

export const AssetService = {
  list: (): Asset[] => clone(store),
  get: (id: string): Asset | undefined => clone(store.find((a) => a.id === id)),
  listByType: (type: AssetType): Asset[] => clone(store.filter((a) => a.type === type)),
};
