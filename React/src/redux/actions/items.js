import { ItemTypes as Types } from "../Types";

export function ItemsLoaded(data) {
  return { type: Types.ITEMS_LOADED, data };
}

export function ItemDeleted(id) {
  return { type: Types.ITEM_DELETED, id };
}
