import { Vector } from "../math";
import { RawShape } from "../raw";
/**
 * An enumeration representing the type of a shape.
 */
export declare enum ShapeType {
    Ball = 0,
    Polygon = 1,
    Cuboid = 2,
    Capsule = 3,
    Segment = 4,
    Triangle = 5,
    Trimesh = 6,
    HeightField = 7,
    Cylinder = 8,
    RoundCylinder = 9,
    Cone = 10
}
/**
 * A shape that is a sphere in 3D and a circle in 2D.
 */
export declare class Ball {
    /**
     * The balls radius.
     */
    readonly radius: number;
    /**
     * Creates a new ball with the given radius.
     * @param radius - The balls radius.
     */
    constructor(radius: number);
    intoRaw(): RawShape;
}
/**
 * A shape that is a box in 3D and a rectangle in 2D.
 */
export declare class Cuboid {
    /**
     * The half extent of the cuboid along each coordinate axis.
     */
    halfExtents: Vector;
    /**
     * Creates a new 2D rectangle.
     * @param hx - The half width of the rectangle.
     * @param hy - The helf height of the rectangle.
     */
    constructor(hx: number, hy: number);
    intoRaw(): RawShape;
}
/**
 * A shape that is a capsule.
 */
export declare class Capsule {
    /**
     * The radius of the capsule's basis.
     */
    readonly radius: number;
    /**
     * The capsule's half height, along the `y` axis.
     */
    readonly halfHeight: number;
    /**
     * Creates a new capsule with the given radius and half-height.
     * @param halfHeight - The balls half-height along the `y` axis.
     * @param radius - The balls radius.
     */
    constructor(halfHeight: number, radius: number);
    intoRaw(): RawShape;
}
/**
 * A shape that is a triangle mesh.
 */
export declare class Trimesh {
    /**
     * The vertices of the triangle mesh.
     */
    readonly vertices: Float32Array;
    /**
     * The indices of the triangles.
     */
    readonly indices: Uint32Array;
    /**
     * Creates a new triangle mesh shape.
     *
     * @param vertices - The coordinates of the triangle mesh's vertices.
     * @param indices - The indices of the triangle mesh's triangles.
     */
    constructor(vertices: Float32Array, indices: Uint32Array);
    intoRaw(): RawShape;
}
/**
 * A shape that is a heightfield.
 */
export declare class Heightfield {
    /**
     * The heights of the heightfield, along its local `y` axis.
     */
    readonly heights: Float32Array;
    /**
     * The heightfield's length along its local `x` axis.
     */
    readonly scale: Vector;
    /**
     * Creates a new heightfield shape.
     *
     * @param heights - The heights of the heightfield, along its local `y` axis.
     * @param scale - The scale factor applied to the heightfield.
     */
    constructor(heights: Float32Array, scale: Vector);
    intoRaw(): RawShape;
}
