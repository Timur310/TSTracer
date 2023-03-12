import { Point } from "../Point.ts";
import { Ray } from "../Ray.ts";
import { degreeToRadian } from "../Utils/MathUtils.ts";
import {
	addVector,
	cross,
	divideVectorN,
	multiplyVectorN,
	randomInUnitDisk,
	unitVector,
} from "../Utils/vecUtil.ts";
import { substractVector } from "../Utils/vecUtil.ts";
import { Vector3 } from "../Vector3.ts";

export class Camera {
	private lookFrom: Point;
	private lookAt: Point;
	private vUp: Vector3;

	private aperture: number;
	private focusDist: number;
	private lensRadius: number;

	private w: Vector3;
	private u: Vector3;
	private v: Vector3;

	private theta: number;
	private h: number;
	private viewport_height: number;
	private viewport_width: number;

	private origin: Vector3;
	private horizontal: Vector3;
	private vertical: Vector3;
	private lower_left_corner: Vector3;

	constructor(
		lookFrom: Point,
		lookAt: Point,
		vUp: Vector3,
		aperture: number,
		focusDist: number,
		fov: number,
		aspect_ratio: number,
	) {
		this.aperture = aperture;
		this.focusDist = focusDist;

		this.theta = degreeToRadian(fov);
		this.h = Math.tan(this.theta / 2.0);

		this.viewport_height = 2.0 * this.h;
		this.viewport_width = aspect_ratio * this.viewport_height;

		this.lookAt = lookAt;
		this.lookFrom = lookFrom;
		this.vUp = vUp;

		this.w = unitVector(substractVector(this.lookFrom, this.lookAt));
		this.u = unitVector(cross(this.vUp, this.w));
		this.v = cross(this.w, this.u);

		this.origin = this.lookFrom;
		this.horizontal = multiplyVectorN(
			this.u,
			this.viewport_width * focusDist,
		);
		this.vertical = multiplyVectorN(
			this.v,
			this.viewport_height * this.focusDist,
		);
		this.lower_left_corner = substractVector(
			this.origin,
			divideVectorN(this.horizontal, 2),
		).substract(divideVectorN(this.vertical, 2)).substract(
			multiplyVectorN(this.w, this.focusDist),
		);

		this.lensRadius = this.aperture / 2;
	}

	getRay(u: number, v: number): Ray {
		const rd = randomInUnitDisk().multiplyN(this.lensRadius);
		const offset = multiplyVectorN(this.u, rd.x).add(
			multiplyVectorN(this.v, rd.y),
		);

		const a1 = multiplyVectorN(this.horizontal, u);
		const a2 = multiplyVectorN(this.vertical, v);

		return new Ray(
			addVector(this.origin, offset),
			addVector(this.lower_left_corner, a1).add(a2).substract(this.origin)
				.substract(offset),
		);
	}
}
