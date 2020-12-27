import { RawNarrowPhase } from "../raw";
/**
 * The narrow-phase used for precise collision-detection.
 *
 * To avoid leaking WASM resources, this MUST be freed manually with `narrowPhase.free()`
 * once you are done using it.
 */
export declare class NarrowPhase {
    raw: RawNarrowPhase;
    /**
     * Release the WASM memory occupied by this narrow-phase.
     */
    free(): void;
    constructor(raw?: RawNarrowPhase);
}
