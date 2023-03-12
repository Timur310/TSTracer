import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { Material } from "../Materials/Material.ts";
import { Point } from "../Point.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { Vector3 } from "../Vector3.ts";

export class xy_rect implements Hittable {
	mat: Material;
	x0: number;
	x1: number;
	y0: number;
	y1: number;
	k: number;

	constructor(
		x0: number,
		x1: number,
		y0: number,
		y1: number,
		k: number,
		mat: Material,
	) {
		this.mat = mat;
		this.k = k;
		this.x0 = x0;
		this.x1 = x1;
		this.y0 = y0;
		this.y1 = y1;
	}
	bounding_box(): boolean {
		Record.Instance.output_box = new aabb(
			new Point(this.x0, this.y0, this.k - 0.0001),
			new Point(this.x1, this.y1, this.k + 0.0001),
		);
		return true;
	}

	hit(r: Ray, t_min: number, t_max: number): boolean {
		const t = (this.k - r.getOrigin.z) / r.getDirection.z;
		if (t < t_min || t > t_max) {
			return false;
		}
		const x = r.getOrigin.x + t * r.getDirection.x;
		const y = r.getOrigin.y + t * r.getDirection.y;
		if (x < this.x0 || x > this.x1 || y < this.y0 || y > this.y1) {
			return false;
		}

		Record.Instance.t = t;
		Record.Instance.p = r.at(t);
		const outward_normal = new Vector3(0, 0, 1);
		Record.Instance.set_front_face(r, outward_normal);
		Record.Instance.material = this.mat;
		return true;
	}
}
