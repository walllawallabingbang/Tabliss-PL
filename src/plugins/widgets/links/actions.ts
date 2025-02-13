import { Link } from "./types";

export function addLink() {
  return {
    type: "ADD_LINK",
  } as const;
}

export function updateLink(index: number, link: Link) {
  return {
    type: "UPDATE_LINK",
    data: { index, link },
  } as const;
}

export function updateIconSize(index: number, iconSize: number) {
  return {
    type: "UPDATE_ICON_SIZE",
    data: { index, iconSize },
  } as const;
}

export function updateCustomIcon(index: number, IconString: string) {
  return {
    type: "UPDATE_CUSTOM_ICON",
    data: { index, IconString },
  } as const;
}

export function removeLink(index: number) {
  return {
    type: "REMOVE_LINK",
    data: { index },
  } as const;
}

export function reorderLink(index: number, to: number) {
  return {
    type: "REORDER_LINK",
    data: { index, to },
  } as const;
}

export type Action =
  | ReturnType<typeof addLink>
  | ReturnType<typeof updateIconSize>
  | ReturnType<typeof updateCustomIcon>
  | ReturnType<typeof updateLink>
  | ReturnType<typeof removeLink>
  | ReturnType<typeof reorderLink>;
