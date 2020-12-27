export * from "./math";
export * from "./dynamics";
export * from "./geometry";
export * from "./pipeline";

// webpack build fills in the correct import, depending on 2d or 3d
// ##WASM_IMPORT##

/**
 * Initializes RAPIER.
 * Has to be called and awaited before using any library methods.
 */
export async function init() {
  let base64 = (wasmBase64 as string).replace(
    "data:application/wasm;base64,",
    ""
  );
  let bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  await wasmInit(bytes);
}
