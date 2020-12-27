import { RawPhysicsPipeline } from "../raw";
import { Vector } from "../math";
import { IntegrationParameters, JointSet, RigidBodyHandle, RigidBodySet } from "../dynamics";
import { BroadPhase, ColliderHandle, ColliderSet, NarrowPhase } from "../geometry";
import { EventQueue } from "./event_queue";
export declare class PhysicsPipeline {
    raw: RawPhysicsPipeline;
    free(): void;
    constructor(raw?: RawPhysicsPipeline);
    step(gravity: Vector, integrationParameters: IntegrationParameters, broadPhase: BroadPhase, narrowPhase: NarrowPhase, bodies: RigidBodySet, colliders: ColliderSet, joints: JointSet, eventQueue?: EventQueue): void;
    /**
     * Removes a rigid-body, and everything attached to it, from the given sets.
     * @param handle - The handle of the rigid-body to remove.
     * @param broadPhase - The broad-phase affected by the colliders attached to this rigid-body.
     * @param narrowPhase - The narrow-phase affected by the collides attached to this rigid-body.
     * @param bodies - The set containing the rigid-body to remove.
     * @param colliders - The set containing the colliders attached to the rigid-body to remove.
     * @param joints - The set containing the joints attached to the rigid-body to remove.
     */
    removeRigidBody(handle: RigidBodyHandle, broadPhase: BroadPhase, narrowPhase: NarrowPhase, bodies: RigidBodySet, colliders: ColliderSet, joints: JointSet): void;
    /**
     * Remove a collider.
     * @param handle - The handle of the collider to remove.
     * @param broadPhase - The broad-phase affected by the collider to remove.
     * @param narrowPhase - The narrow-phase affected by the collider to remove.
     * @param bodies - The set of rigid-bodies containing the parent of the collider to remove.
     * @param colliders - The set of colliders containing the collider to remove.
     */
    removeCollider(handle: ColliderHandle, broadPhase: BroadPhase, narrowPhase: NarrowPhase, bodies: RigidBodySet, colliders: ColliderSet): void;
}
