import React from "react";
import { DEBUG_MODE } from "@env";

export default function Box({ label, top, left, width, height, children }) {
  const boxProps = { label, top, left, width, height };
  return (
    <box
      {...boxProps}
      border={{ type: "line" }}
      style={{
        border: { fg: "blue" },
      }}
    >
      {DEBUG_MODE
        ? `${JSON.stringify({ top, left, width, height }, null, 2)}`
        : null}
      {children}
    </box>
  );
}
