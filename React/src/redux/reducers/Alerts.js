import { AlertTypes as Types } from "../Types";

export default function (state = {}, action) {
  switch (action.type) {
    case Types.SET_ALERT:
      return action.alert;
    default:
      return state;
  }
}
