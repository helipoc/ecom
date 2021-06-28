import { ItemTypes as Types } from "../Types";

export default function (state = [], action) {
  switch (action.type) {
    case Types.ITEMS_LOADED:
      return [...action.data];
    case Types.ITEM_DELETED:
      return state.filter((c) => c._id != action.id);
    default:
      return state;
  }
}
