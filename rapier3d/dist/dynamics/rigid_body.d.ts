import { RawRigidBodySet } from "../raw";
import { Rotation, Vector } from '../math';
import { ColliderHandle } from "../geometry";
/**
 * The integer identifier of a collider added to a `ColliderSet`.
 */
export declare type RigidBodyHandle = number;
/**
 * The simulation status of a rigid-body.
 */
export declare enum BodyStatus {
    /**
     * A `BodyStatus::Dynamic` body can be affected by all external forces.
     */
    Dynamic = 0,
    /**
     * A `BodyStatus::Static` body cannot be affected by external forces.
     */
    Static = 1,
    /**
     * A `BodyStatus::Kinematic` body cannot be affected by any external forces but can be controlled
     * by the user at the position level while keeping realistic one-way interaction with dynamic bodies.
     *
     * One-way interaction means that a kinematic body can push a dynamic body, but a kinematic body
     * cannot be pushed by anything. In other words, the trajectory of a kinematic body can only be
     * modified by the user and is independent from any contact or joint it is involved in.
     */
    Kinematic = 2
}
/**
 * A rigid-body.
 */
export declare class RigidBody {
    private rawSet;
    readonly handle: RigidBodyHandle;
    constructor(rawSet: RawRigidBodySet, handle: RigidBodyHandle);
    /**
     * Checks if this rigid-body is still valid (i.e. that it has
     * not been deleted from the rigid-body set yet.
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
     * The world-space predicted translation of this rigid-body.
     *
     * If this rigid-body is kinematic this value is set by the `setNextKinematicTranslation`
     * method and is used for estimating the kinematic body velocity at the next timestep.
     * For non-kinematic bodies, this value is currently unspecified.
     */
    predictedTranslation(): Vector;
    /**
     * The world-space predicted orientation of this rigid-body.
     *
     * If this rigid-body is kinematic this value is set by the `setNextKinematicRotation`
     * method and is used for estimating the kinematic body velocity at the next timestep.
     * For non-kinematic bodies, this value is currently unspecified.
     */
    predictedRotation(): Rotation;
    /**
     * Sets the translation of this rigid-body.
     *
     * @param tra - The world-space position of the rigid-body.
     * @param wakeUp - Forces the rigid-body to wake-up so it is properly affected by forces if it
     *                 wasn't moving before modifying its position.
     */
    setTranslation(tra: Vector, wakeUp: boolean): void;
    /**
     * Sets the linear velocity fo this rigid-body.
     *
     * @param vel - The linear velocity to set.
     * @param wakeUp - Forces the rigid-body to wake-up if it was asleep.
     */
    setLinvel(vel: Vector, wakeUp: boolean): void;
    /**
     * Sets the rotation quaternion of this rigid-body.
     *
     * This does nothing if a zero quaternion is provided.
     *
     * @param rotation - The rotation to set.
     * @param wakeUp - Forces the rigid-body to wake-up so it is properly affected by forces if it
     * wasn't moving before modifying its position.
     */
    setRotation(rot: Rotation, wakeUp: boolean): void;
    /**
     * Sets the angular velocity fo this rigid-body.
     *
     * @param vel - The angular velocity to set.
     * @param wakeUp - Forces the rigid-body to wake-up if it was asleep.
     */
    setAngvel(vel: Vector, wakeUp: boolean): void;
    /**
     * If this rigid body is kinematic, sets its future translation after the next timestep integration.
     *
     * This should be used instead of `rigidBody.setTranslation` to make the dynamic object
     * interacting with this kinematic body behave as expected. Internally, Rapier will compute
     * an artificial velocity for this rigid-body from its current position and its next kinematic
     * position. This velocity will be used to compute forces on dynamic bodies interacting with
     * this body.
     *
     * @param t - The kinematic translation to set.
     */
    setNextKinematicTranslation(t: Vector): void;
    /**
     * If this rigid body is kinematic, sets its future rotation after the next timestep integration.
     *
     * This should be used instead of `rigidBody.setRotation` to make the dynamic object
     * interacting with this kinematic body behave as expected. Internally, Rapier will compute
     * an artificial velocity for this rigid-body from its current position and its next kinematic
     * position. This velocity will be used to compute forces on dynamic bodies interacting with
     * this body.
     *
     * @param rot - The kinematic rotation to set.
     */
    setNextKinematicRotation(rot: Rotation): void;
    /**
     * The linear velocity of this rigid-body.
     */
    linvel(): Vector;
    /**
     * The angular velocity of this rigid-body.
     */
    angvel(): Vector;
    /**
     * The mass of this rigid-body.
     */
    mass(): number;
    /**
     * Put this rigid body to sleep.
     *
     * A sleeping body no longer moves and is no longer simulated by the physics engine unless
     * it is waken up. It can be woken manually with `this.wakeUp()` or automatically due to
     * external forces like contacts.
     */
    sleep(): void;
    /**
     * Wakes this rigid-body up.
     *
     * A dynamic rigid-body that does not move during several consecutive frames will
     * be put to sleep by the physics engine, i.e., it will stop being simulated in order
     * to avoid useless computations.
     * This methods forces a sleeping rigid-body to wake-up. This is useful, e.g., before modifying
     * the position of a dynamic body so that it is properly simulated afterwards.
     */
    wakeUp(): void;
    /**
     * The number of colliders attached to this rigid-body.
     */
    numColliders(): number;
    /**
     * Retrieves the handle of the `i-th` collider attached to this rigid-body.
     *
     * @param i - The index of the collider to retrieve. Must be a number in `[0, this.numColliders()[`.
     *         This index is **not** the same as the unique identifier of the collider.
     */
    collider(i: number): ColliderHandle;
    /**
     * The status of this rigid-body: static, dynamic, or kinematic.
     */
    bodyStatus(): BodyStatus;
    /**
     * Is this rigid-body sleeping?
     */
    isSleeping(): boolean;
    /**
     * Is the velocity of this rigid-body not zero?
     */
    isMoving(): boolean;
    /**
     * Is this rigid-body static?
     */
    isStatic(): boolean;
    /**
     * Is this rigid-body kinematic?
     */
    isKinematic(): boolean;
    /**
     * Is this rigid-body dynamic?
     */
    isDynamic(): boolean;
    /**
     * The linear damping coefficient of this rigid-body.
     */
    linearDamping(): number;
    /**
     * The angular damping coefficient of this rigid-body.
     */
    angularDamping(): number;
    /**
     * Applies a force at the center-of-mass of this rigid-body.
     *
     * @param force - the world-space force to apply on the rigid-body.
     * @param wakeUp - should the rigid-body be automatically woken-up?
     */
    applyForce(force: Vector, wakeUp: boolean): void;
    /**
     * Applies an impulse at the center-of-mass of this rigid-body.
     *
     * @param impulse - the world-space impulse to apply on the rigid-body.
     * @param wakeUp - should the rigid-body be automatically woken-up?
     */
    applyImpulse(impulse: Vector, wakeUp: boolean): void;
    /**
     * Applies a torque at the center-of-mass of this rigid-body.
     *
     * @param torque - the world-space torque to apply on the rigid-body.
     * @param wakeUp - should the rigid-body be automatically woken-up?
     */
    applyTorque(torque: Vector, wakeUp: boolean): void;
    /**
     * Applies an impulsive torque at the center-of-mass of this rigid-body.
     *
     * @param torqueImpulse - the world-space torque impulse to apply on the rigid-body.
     * @param wakeUp - should the rigid-body be automatically woken-up?
     */
    applyTorqueImpulse(torqueImpulse: Vector, wakeUp: boolean): void;
    /**
     * Applies a force at the given world-space point of this rigid-body.
     *
     * @param force - the world-space force to apply on the rigid-body.
     * @param point - the world-space point where the impulse is to be applied on the rigid-body.
     * @param wakeUp - should the rigid-body be automatically woken-up?
     */
    applyForceAtPoint(force: Vector, point: Vector, wakeUp: boolean): void;
    /**
     * Applies an impulse at the given world-space point of this rigid-body.
     *
     * @param impulse - the world-space impulse to apply on the rigid-body.
     * @param point - the world-space point where the impulse is to be applied on the rigid-body.
     * @param wakeUp - should the rigid-body be automatically woken-up?
     */
    applyImpulseAtPoint(impulse: Vector, point: Vector, wakeUp: boolean): void;
}
export declare class RigidBodyDesc {
    translation: Vector;
    rotation: Rotation;
    mass: number;
    collidersMassContributionEnabled: boolean;
    centerOfMass: Vector;
    linvel: Vector;
    angvel: Vector;
    principalAngularInertia: Vector;
    angularInertiaLocalFrame: Rotation;
    collidersPrincipalAngularInertiaContributionEnabledX: boolean;
    collidersPrincipalAngularInertiaContributionEnabledY: boolean;
    collidersPrincipalAngularInertiaContributionEnabledZ: boolean;
    linearDamping: number;
    angularDamping: number;
    status: BodyStatus;
    canSleep: boolean;
    constructor(status: BodyStatus);
    /**
     * Sets the initial translation of the rigid-body to create.
     *
     * @param tra - The translation to set.
     */
    setTranslation(tra: Vector): RigidBodyDesc;
    /**
     * Sets the initial rotation of the rigid-body to create.
     *
     * @param rot - The otation to set.
     */
    setRotation(rot: Rotation): RigidBodyDesc;
    /**
     * Sets the mass of the rigid-body being built.
     *
     * Use `this.setMass(0.0, false)` to disable translations for this
     * collider.
     *
     * Note that if `collidierMassContributionEnabled` is set to `true` then
     * the final mass of the rigid-bodies depends on the initial mass set by
     * this method to which is added the contributions of all the colliders
     * with non-zero density attached to this rigid-body.
     *
     * @param mass − The initial mass of the rigid-body to create.
     * @param collidersMassContributionEnabled - If `true`, then mass contributions from colliders
     *   with non-zero densities will be taken into account.
     */
    setMass(mass: number, collidersMassContributionEnabled: boolean): RigidBodyDesc;
    /**
     * Locks all translations that would have resulted from forces on
     * the created rigid-body.
     */
    lockTranslations(): RigidBodyDesc;
    /**
     * Sets the initial linear velocity of the rigid-body to create.
     *
     * @param vel - The linear velocity to set.
     */
    setLinvel(vel: Vector): RigidBodyDesc;
    /**
     * Sets the initial angular velocity of the rigid-body to create.
     *
     * @param vel - The angular velocity to set.
     */
    setAngvel(vel: Vector): RigidBodyDesc;
    /**
     * Sets the mass properties of the rigid-body being built.
     *
     * Note that the final mass properties of the rigid-bodies depends
     * on the initial mass-properties of the rigid-body (set by this method)
     * to which is added the contributions of all the colliders with non-zero density
     * attached to this rigid-body.
     *
     * Therefore, if you want your provided mass properties to be the final
     * mass properties of your rigid-body, don't attach colliders to it, or
     * only attach colliders with densities equal to zero.
     *
     * @param mass − The initial mass of the rigid-body to create.
     * @param centerOfMass − The initial center-of-mass of the rigid-body to create.
     * @param principalAngularInertia − The initial principal angular inertia of the rigid-body to create.
     *                                  These are the eigenvalues of the angular inertia matrix.
     * @param angularInertiaLocalFrame − The initial local angular inertia frame of the rigid-body to create.
     *                                   These are the eigenvectors of the angular inertia matrix.
     */
    setMassProperties(mass: number, centerOfMass: Vector, principalAngularInertia: Vector, angularInertiaLocalFrame: any): this;
    /**
     * Sets the mass properties of the rigid-body being built.
     *
     * Note that if any `collidersAngularInertiaContributionEnabled*` is `true`,
     * then the final angular inertia of the rigid-body for this axis depends
     * on the initial angular inertia set by this method to which is
     * added the contributions of all the colliders with non-zero density
     * attached to this rigid-body.
     *
     * @param principalAngularInertia − The initial principal angular inertia of the rigid-body to create.
     * @param collidersAngularInertiaContributionEnabled - Should the inertia contribution from collider be taken
     *    into account by the rigid-body?
     */
    setPrincipalAngularInertia(principalAngularInertia: Vector, collidersAngularInertiaContributionEnabledX: boolean, collidersAngularInertiaContributionEnabledY: boolean, collidersAngularInertiaContributionEnabledZ: boolean): this;
    /**
     * Locks all rotations that would have resulted from forces on
     * the created rigid-body.
     */
    lockRotations(): this;
    /**
     * Sets the linear damping of the rigid-body to create.
     *
     * This will progressively slowdown the translational movement of the rigid-body.
     *
     * @param damping - The angular damping coefficient. Should be >= 0. The higher this
     *                  value is, the stronger the translational slowdown will be.
     */
    setLinearDamping(damping: number): RigidBodyDesc;
    /**
     * Sets the angular damping of the rigid-body to create.
     *
     * This will progressively slowdown the rotational movement of the rigid-body.
     *
     * @param damping - The angular damping coefficient. Should be >= 0. The higher this
     *                  value is, the stronger the rotational slowdown will be.
     */
    setAngularDamping(damping: number): RigidBodyDesc;
    /**
     * Sets whether or not the rigid-body to create can sleep.
     *
     * @param can - true if the rigid-body can sleep, false if it can't.
     */
    setCanSleep(can: boolean): RigidBodyDesc;
}
