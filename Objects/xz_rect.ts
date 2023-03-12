import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { Material } from "../Materials/Material.ts";
import { Point } from "../Point.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { Vector3 } from "../Vector3.ts";

export class xz_rect implements Hittable {
	mat: Material;
	x0: number;
	x1: number;
	z0: number;
	z1: number;
	k: number;

	constructor(
		x0: number,
		x1: number,
		z0: number,
		z1: number,
		k: number,
		mat: Material,
	) {
		this.mat = mat;
		this.k = k;
		this.x0 = x0;
		this.x1 = x1;
		this.z0 = z0;
		this.z1 = z1;
	}

	bounding_box(): boolean {
		Record.Instance.output_box = new aabb(
			new Point(this.x0, this.k - 0.0001, this.z0),
			new Point(this.x1, this.k + 0.0002, this.z1),
		);
		return true;
	}

	hit(r: Ray, t_min: number, t_max: number): boolean {
		const t = (this.k - r.getOrigin.y) / r.getDirection.y;
		if (t < t_min || t > t_max) {
			return false;
		}
		const x = r.getOrigin.x + t * r.getDirection.x;
		const z = r.getOrigin.z + t * r.getDirection.z;
		if (x < this.x0 || x > this.x1 || z < this.z0 || z > this.z1) {
			return false;
		}

		Record.Instance.t = t;
		Record.Instance.p = r.at(t);
		const outward_normal = new Vector3(0, 1, 0);
		Record.Instance.set_front_face(r, outward_normal);
		Record.Instance.material = this.mat;
		return true;
	}
}
