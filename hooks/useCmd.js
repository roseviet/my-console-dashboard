import React from "react";
import { exec } from "@lib/shell";
export default function useCmd(cmd, initValue = "") {
  const [state, setState] = React.useState({
    data: initValue,
    error: null,
    loading: false,
  });

  React.useEffect(() => {
    setState((s) => Object.assign(s, { loading: true }));
    exec(cmd)
      .then((data) => {
        setState({ data, error: null, loading: false });
      })
      .catch((err) => {
        setState({ data: null, error: err, loading: false });
      });
  }, []);
  return state;
}
