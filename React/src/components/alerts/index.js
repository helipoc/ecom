import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

function Alerts() {
  const alert = useSelector((state) => state.Alert);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (alert.msg && alert.sev) {
      enqueueSnackbar(alert.msg, { variant: alert.sev });
    }
  }, [alert, enqueueSnackbar]);
  return null;
}

export default Alerts;
