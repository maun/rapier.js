import { RawColliderSet } from "../raw";
import { Rotation, Vector } from '../math';
import { InteractionGroups, Cuboid, Ball, ShapeType, Capsule, Trimesh, Heightfield } from './index';
import { RigidBodyHandle } from '../dynamics';
/**
 * The integer identifier of a collider added to a `ColliderSet`.
 */
export declare type ColliderHandle = number;
/**
 * A geometric entity that can be attached to a body so it can be affected
 * by contacts and proximity queries.
 */
export declare class Collider {
    private rawSet;
    readonly handle: ColliderHandle;
    constructor(rawSet: RawColliderSet, handle: ColliderHandle);
    /**
     * Checks if this collider is still valid (i.e. that it has
     * not been deleted from the collider set yet.
     */
    isValid(): boolean;
    /**
     * The world-space translation of this rigid-body.
     */
    translation(): Vector;
    /**
     * The world-space orientation of this rigid-body.
     */
    rotation(): Rotation;
    /**
     * Is this collider a sensor?
     */
    isSensor(): boolean;
    /**
     * The type of the shape of this collider.
     */
    shapeType(): ShapeType;
    /**
     * The half-extents of this collider if it is a cuboid shape.
     */
    halfExtents(): Vector;
    /**
     * The radius of this collider if it is a ball, cylinder, capsule, or cone shape.
     */
    radius(): number;
    /**
     * The radius of the round edges of this collider if it is a round cylinder.
     */
    roundRadius(): number;
    /**
     * The half height of this collider if it is a cylinder, capsule, or cone shape.
     */
    halfHeight(): number;
    /**
     * If this collider has a triangle mesh shape, this returns the vertex buffer
     * of the triangle esh.
     */
    trimeshVertices(): Float32Array;
    /**
     * If this collider has a triangle mesh shape, this returns the index buffer
     * of the triangle mesh.
     */
    trimeshIndices(): Uint32Array;
    /**
     * If this collider has a heightfield shape, this returns the heights buffer of
     * the heightfield.
     * In 3D, the returned height matrix is provided in column-major order.
     */
    heightfieldHeights(): Float32Array;
    /**
     * If this collider has a heightfield shape, this returns the scale
     * applied to it.
     */
    heightfieldScale(): Vector;
    /**
     * The unique integer identifier of the rigid-body this collider is attached to.
     */
    parent(): RigidBodyHandle;
    /**
     * The friction coefficient of this collider.
     */
    friction(): number;
    /**
     * The density of this collider.
     */
    density(): number;
    /**
     * The collision groups of this collider.
     */
    collisionGroups(): InteractionGroups;
    /**
     * The solver gorups of this collider.
     */
    solverGroups(): InteractionGroups;
}
export declare class ColliderDesc {
    shape: Ball | Cuboid | Capsule | Trimesh | Heightfield;
    density?: number;
    friction: number;
    restitution: number;
    rotation: Rotation;
    translation: Vector;
    isSensor: boolean;
    collisionGroups: InteractionGroups;
    solverGroups: InteractionGroups;
    /**
     * Initializes a collider descriptor from the collision shape.
     *
     * @param shape - The shape of the collider being built.
     */
    constructor(shape: Ball | Cuboid | Capsule | Trimesh | Heightfield);
    /**
     * Create a new collider descriptor with a ball shape.
     *
     * @param radius - The radius of the ball.
     */
    static ball(radius: number): ColliderDesc;
    /**
     * Create a new collider descriptor with a capsule shape.
     *
     * @param half_height - The half-height of the capsule, along the `y` axis.
     * @param radius - The radius of the capsule basis.
     */
    static capsule(half_height: number, radius: number): ColliderDesc;
    /**
     * Creates a new collider descriptor with a triangle mesh shape.
     *
     * @param vertices - The coordinates of the triangle mesh's vertices.
     * @param indices - The indices of the triangle mesh's triangles.
     */
    static trimesh(vertices: Float32Array, indices: Uint32Array): ColliderDesc;
    /**
     * Creates a new collider descriptor with a rectangular shape.
     *
     * @param hx - The half-width of the rectangle along its local `x` axis.
     * @param hy - The half-width of the rectangle along its local `y` axis.
     */
    static cuboid(hx: number, hy: number): ColliderDesc;
    /**
     * Creates a new collider descriptor with a heightfield shape.
     *
     * @param heights - The heights of the heightfield, along its local `y` axis.
     * @param scale - The scale factor applied to the heightfield.
     */
    static heightfield(heights: Float32Array, scale: Vector): ColliderDesc;
    /**
     * Sets the position of the collider to be created relative to the rigid-body it is attached to.
     *
     * @param tra - The position of the collider to be created relative to the rigid-body it is attached to.
     */
    setTranslation(tra: Vector): ColliderDesc;
    /**
     * Sets the rotation of the collider to be created relative to the rigid-body it is attached to.
     *
     * @param rot - The rotation of the collider to be created relative to the rigid-body it is attached to.
     */
    setRotation(rot: Rotation): ColliderDesc;
    /**
     * Sets whether or not the collider being created is a sensor.
     *
     * A sensor collider does not take part of the physics simulation, but generates
     * proximity events.
     *
     * @param is - Set to `true` of the collider built is to be a sensor.
     */
    setIsSensor(is: boolean): ColliderDesc;
    /**
     * Sets the density of the collider being built.
     *
     * @param density - The density to set, must be greater or equal to 0. A density of 0 means that this collider
     *                  will not affect the mass or angular inertia of the rigid-body it is attached to.
     */
    setDensity(density: number): ColliderDesc;
    /**
     * Sets the restitution coefficient of the collider to be created.
     *
     * @param restitution - The restitution coefficient in `[0, 1]`. A value of 0 (the default) means no bouncing behavior
     *                   while 1 means perfect bouncing (though energy may still be lost due to numerical errors of the
     *                   constraints solver).
     */
    setRestitution(restitution: number): ColliderDesc;
    /**
     * Sets the friction coefficient of the collider to be created.
     *
     * @param friction - The friction coefficient. Must be greater or equal to 0. This is generally smaller than 1. The
     *                   higher the coefficient, the stronger friction forces will be for contacts with the collider
     *                   being built.
     */
    setFriction(friction: number): ColliderDesc;
    /**
     * Sets the collision groups used by this collider.
     *
     * Two colliders will interact iff. their collision groups are compatible.
     * See the documentation of `InteractionGroups` for details on teh used bit pattern.
     *
     * @param groups - The collision groups used for the collider being built.
     */
    setCollisionGroups(groups: InteractionGroups): ColliderDesc;
    /**
     * Sets the solver groups used by this collider.
     *
     * Forces between two colliders in contact will be computed iff their solver
     * groups are compatible.
     * See the documentation of `InteractionGroups` for details on the used bit pattern.
     *
     * @param groups - The solver groups used for the collider being built.
     */
    setSolverGroups(groups: InteractionGroups): ColliderDesc;
}
