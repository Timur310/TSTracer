import { Point } from "./Point.ts";
import { addVector, multiplyVectorN } from "./Utils/vecUtil.ts";
import { Vector3 } from "./Vector3.ts";
export class Ray {
	private origin: Point;
	private direction: Vector3;

	constructor(o: Point, v: Vector3) {
		this.origin = o;
		this.direction = v;
	}

	get getOrigin(): Point {
		return this.origin;
	}

	get getDirection(): Vector3 {
		return this.direction;
	}

	at(t: number): Point {
		const dir = multiplyVectorN(this.getDirection, t);
		return addVector(this.origin, dir);
	}
}
