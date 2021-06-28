import { UserTypes as Types } from "../Types";

export default function (state = {}, action) {
  switch (action.type) {
    case Types.SET_USER:
      return { ...action.payload };
    case Types.USER_LOGOUT:
      return {};
    default:
      return state;
  }
}
