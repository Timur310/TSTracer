import { Point } from "./Point.ts";
import { Ray } from "./Ray.ts";

export class aabb {
	static surrounding_box(box0: aabb, box1: aabb): aabb {
		const small = new Point(
			Math.min(box0.minimum.x, box1.minimum.x),
			Math.min(box0.minimum.y, box1.minimum.y),
			Math.min(box0.minimum.z, box1.minimum.z),
		);

		const big = new Point(
			Math.max(box0.maximum.x, box1.maximum.x),
			Math.max(box0.maximum.y, box1.maximum.y),
			Math.max(box0.maximum.z, box1.maximum.z),
		);

		return new aabb(small, big);
	}

	private minimum: Point;
	private maximum: Point;

	constructor(a?: Point, b?: Point) {
		this.minimum = a ? a : new Point();
		this.maximum = b ? b : new Point();
	}

	hit(r: Ray, t_min: number, t_max: number): boolean {
		for (let a = 0; a < 3; a++) {
			const invD = 1 / r.getDirection.atIndex(a);
			let t0 = (this.minimum.atIndex(a) - r.getOrigin.atIndex(a)) * invD;
			let t1 = (this.maximum.atIndex(a) - r.getOrigin.atIndex(a)) * invD;

			if (invD < 0) {
				const temp = t0;
				t1 = t0;
				t0 = temp;
			}
			t_min = t0 > t_min ? t0 : t_min;
			t_max = t1 < t_max ? t1 : t_max;

			if (t_max <= t_min) return false;
		}
		return true;
	}

	public get min(): Point {
		return this.minimum;
	}

	public get max(): Point {
		return this.maximum;
	}
}
