import { Link } from "./types";
import { Action } from "./actions";

type State = Link[];

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_LINK":
      return state.concat({ url: "https://" });

    case "REMOVE_LINK":
      return state.filter((_, index) => index !== action.data.index);

    case "UPDATE_LINK":
      return state.map((link, index) =>
        index === action.data.index ? action.data.link : link,
      );

    case "UPDATE_ICON_SIZE":
      return state.map((link) => ({ ...link, iconSize: action.data.iconSize }));

    case "UPDATE_CUSTOM_ICON":
      return state.map((link) => ({
        ...link,
        IconString: action.data.IconString,
      }));

    case "REORDER_LINK":
      const links = [...state];
      links.splice(action.data.to, 0, links.splice(action.data.index, 1)[0]);
      return links;

    default:
      throw new Error("Unknown action");
  }
}
