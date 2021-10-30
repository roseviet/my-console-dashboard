import React from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export default function useRequest (promise, options) {
  const [state, setState] = React.useState({
    status: "loading",
    error: null,
    data: null,
  });

  const request = React.useCallback(async () => {
    setState({
      status: "loading",
      error: null,
      data: null,
    });
    let data;
    try {
      data = await promise(options);
      setState({
        status: "completed",
        error: null,
        data,
      });
    } catch (err) {
      setState({ status: "error", error: err, data: null });
    }
  }, [promise]);

  useDeepCompareEffect(() => {
    request(options);
  }, [options, request]);
  return state;
}