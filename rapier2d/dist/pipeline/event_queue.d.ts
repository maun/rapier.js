import { RawEventQueue } from '../raw';
import { ColliderHandle } from '../geometry';
/**
 * An enumeration representing the various state of proximity between
 * two colliders.
 */
export declare enum Proximity {
    /**
     * The sensor is intersecting the other collider.
     */
    Intersecting = 0,
    /**
     * The sensor is within tolerance margin of the other collider.
     */
    WithinMargin = 1,
    /**
     * The sensor is disjoint from the other collider.
     */
    Disjoint = 2
}
/**
 * A structure responsible for collecting events generated
 * by the physics engine.
 *
 * To avoid leaking WASM resources, this MUST be freed manually with `eventQueue.free()`
 * once you are done using it.
 */
export declare class EventQueue {
    raw: RawEventQueue;
    /**
     * Creates a new event collector.
     *
     * @param autoDrain -setting this to `true` is strongly recommended. If true, the collector will
     * be automatically drained before each `world.step(collector)`. If false, the collector will
     * keep all events in memory unless it is manually drained/cleared; this may lead to unbounded use of
     * RAM if no drain is performed.
     */
    constructor(autoDrain: boolean, raw?: RawEventQueue);
    /**
     * Release the WASM memory occupied by this event-queue.
     */
    free(): void;
    /**
     * Applies the given javascript closure on each contact event of this collector, then clear
     * the internal contact event buffer.
     *
     * @param f - JavaScript closure applied to each contact event. The
     * closure should take three arguments: two integers representing the handles of the colliders
     * involved in the contact, and a boolean indicating if the contact started (true) or stopped
     * (false).
     */
    drainContactEvents(f: (handle1: ColliderHandle, handle2: ColliderHandle, started: boolean) => void): void;
    /**
     * Applies the given javascript closure on each proximity event of this collector, then clear
     * the internal proximity event buffer.
     *
     * @param f - JavaScript closure applied to each proximity event. The
     * closure should take four arguments: two integers representing the handles of the colliders
     * involved in the proximity, and two `Proximity` enums representing the previous proximity
     * status and the new proximity status.
     */
    drainProximityEvents(f: (handle1: ColliderHandle, handle2: ColliderHandle, prevProx: Proximity, newProx: Proximity) => void): void;
    /**
     * Removes all events contained by this collector
     */
    clear(): void;
}
