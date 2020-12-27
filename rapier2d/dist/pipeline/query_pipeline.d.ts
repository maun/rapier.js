import { RawQueryPipeline } from "../raw";
import { ColliderSet, Ray, RayColliderIntersection } from "../geometry";
import { RigidBodySet } from "../dynamics";
/**
 * A pipeline for performing queries on all the colliders of a scene.
 *
 * To avoid leaking WASM resources, this MUST be freed manually with `queryPipeline.free()`
 * once you are done using it (and all the rigid-bodies it created).
 */
export declare class QueryPipeline {
    raw: RawQueryPipeline;
    /**
     * Release the WASM memory occupied by this query pipeline.
     */
    free(): void;
    constructor(raw?: RawQueryPipeline);
    /**
     * Updates the acceleration structure of the query pipeline.
     * @param bodies - The set of rigid-bodies taking part in this pipeline.
     * @param colliders - The set of colliders taking part in this pipeline.
     */
    update(bodies: RigidBodySet, colliders: ColliderSet): void;
    /**
     * Find the closest intersection between a ray and a set of collider.
     *
     * @param position - The position of this shape.
     * @param ray - The ray to cast.
     * @param max_toi - The maximum time-of-impact that can be reported by this cast. This effectively
     *   limits the length of the ray to `ray.dir.norm() * max_toi`. Use `f32::MAX` for an unbounded ray.
     */
    castRay(colliders: ColliderSet, ray: Ray, maxToi: number): RayColliderIntersection;
}
