import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { Material } from "../Materials/Material.ts";
import { Point } from "../Point.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { Vector3 } from "../Vector3.ts";

export class yz_rect implements Hittable {
	mat: Material;
	z0: number;
	z1: number;
	y0: number;
	y1: number;
	k: number;

	constructor(
		z0: number,
		z1: number,
		y0: number,
		y1: number,
		k: number,
		mat: Material,
	) {
		this.mat = mat;
		this.k = k;
		this.z0 = z0;
		this.z1 = z1;
		this.y0 = y0;
		this.y1 = y1;
	}

	bounding_box(): boolean {
		Record.Instance.output_box = new aabb(
			new Point(this.k - 0.0001, this.y0, this.z0),
			new Point(this.k + 0.0001, this.y1, this.z1),
		);
		return true;
	}

	hit(r: Ray, t_min: number, t_max: number): boolean {
		const t = (this.k - r.getOrigin.x) / r.getDirection.x;
		if (t < t_min || t > t_max) {
			return false;
		}
		const y = r.getOrigin.y + t * r.getDirection.y;
		const z = r.getOrigin.z + t * r.getDirection.z;
		if (y < this.z0 || y > this.z1 || z < this.y0 || z > this.y1) {
			return false;
		}

		Record.Instance.t = t;
		Record.Instance.p = r.at(t);
		const outward_normal = new Vector3(1, 0, 0);
		Record.Instance.set_front_face(r, outward_normal);
		Record.Instance.material = this.mat;
		return true;
	}
}
