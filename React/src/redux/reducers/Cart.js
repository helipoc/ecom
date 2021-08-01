import { CartTypes as Types } from "../Types";
export default function (state = { count: 0 }, action) {
  switch (action.type) {
    case Types.ADD_ITEM:
      return { ...state, count: state.count + 1 };
    case Types.LOAD_ITEMS:
      return { ...state, items: action.data ? [...action.data] : [] };
    case Types.ITEM_REMOVED:
      return {
        ...state,
        items: [...state.items].filter((item) => item._id != action.id),
        count: state.count == 0 ? state.count : state.count - 1
      };
    default:
      return state;
  }
}
