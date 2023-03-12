import { Vector3 } from "../Math/Vector3";
import { Hittable } from "./HittableList";
import { Ray } from "./Ray";
import { Material, Record } from "./Record";

export class yz_rect implements Hittable {
	mat: Material;
	private z0: number;
	private z1: number;
	private y0: number;
	private y1: number;
	private k: number;

	constructor(z0: number, z1: number, y0: number, y1: number, k: number, mat: Material,) {
		this.mat = mat;
		this.k = k;
		this.z0 = z0;
		this.z1 = z1;
		this.y0 = y0;
		this.y1 = y1;
	}

	hit(r: Ray, t_min: number, t_max: number, record: Record): boolean {
		const t = (this.k - r.Origin.at(0)) / r.Direction.at(0);
		if (t < t_min || t > t_max) {
			return false;
		}
		const y = r.Origin.at(1) + t * r.Direction.at(1);
		const z = r.Direction.at(2) + t * r.Direction.at(2);
		if (y < this.z0 || y > this.z1 || z < this.y0 || z > this.y1) {
			return false;
		}

		record.t = t;
		record.p = r.at(t);
		const outward_normal = new Vector3(1, 0, 0);
		record.set_front_face(r, outward_normal);
		record.material = this.mat;
		return true;
	}
}
