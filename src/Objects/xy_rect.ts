import { Vector3 } from "../Math/Vector3";
import { Hittable } from "./HittableList";
import { Ray } from "./Ray";
import { Material, Record } from "./Record";

export class xy_rect implements Hittable {
	mat: Material;
	private x0: number;
	private x1: number;
	private y0: number;
	private y1: number;
	private k: number;

	constructor(x0: number, x1: number, y0: number, y1: number, k: number, mat: Material) {
		this.mat = mat;
		this.k = k;
		this.x0 = x0;
		this.x1 = x1;
		this.y0 = y0;
		this.y1 = y1;
	}
	hit(r: Ray, t_min: number, t_max: number, record: Record): boolean {
		const t = (this.k - r.Origin.at(2)) / r.Direction.at(2);
		if (t < t_min || t > t_max) {
			return false;
		}
		const x = r.Origin.at(0) + t * r.Direction.at(0);
		const y = r.Origin.at(1) + t * r.Direction.at(1);
		if (x < this.x0 || x > this.x1 || y < this.y0 || y > this.y1) {
			return false;
		}

		record.t = t;
		record.p = r.at(t);
		const outward_normal = new Vector3(0, 0, 1);
		record.set_front_face(r, outward_normal);
		record.material = this.mat;
		return true;
	}
}
