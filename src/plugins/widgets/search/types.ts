import { API } from "../../types";

type Data = {
  searchEngine: string;
  searchEngineCustom?: string;
  suggestionsEngine?: string;
  suggestionsQuantity: number;
  placeholderText?: string;
  keyBind?: string;
};

export type Props = API<Data>;

export const defaultData: Data = {
  searchEngine: "default",
  suggestionsQuantity: 4,
  keyBind: "G",
};

export const SEARCH_ENGINE_CUSTOM = "CUSTOM";
