import { CartTypes as Types } from "../Types";

export function addItem() {
  return { type: Types.ADD_ITEM };
}

export function LoadItems(data) {
  return { type: Types.LOAD_ITEMS, data };
}

export function RemovedItem(id) {
  return { type: Types.ITEM_REMOVED, id };
}
