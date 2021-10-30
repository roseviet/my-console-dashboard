import { DEBUG_MODE } from "./env";
export function debug() {
  if (DEBUG_MODE) {
    console.log("[DEBUG]", arguments);
  }
}
export function error() {
  console.error("[ERROR]", arguments);
}
