import { AlertTypes as Types } from "../Types";
export function setAlert(msg, sev) {
  return { type: Types.SET_ALERT, alert: { msg, sev } };
}
