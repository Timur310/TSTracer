import { Vector3 } from "../Math/Vector3";
import { Hittable } from "./HittableList";
import { Ray } from "./Ray";
import { Material, Record } from "./Record";

export class xz_rect implements Hittable {
	mat: Material;
	private x0: number;
	private x1: number;
	private z0: number;
	private z1: number;
	private k: number;

	constructor(x0: number, x1: number, z0: number, z1: number, k: number, mat: Material,) {
		this.mat = mat;
		this.k = k;
		this.x0 = x0;
		this.x1 = x1;
		this.z0 = z0;
		this.z1 = z1;
	}

	hit(r: Ray, t_min: number, t_max: number, record: Record): boolean {
		const t = (this.k - r.Origin.at(1)) / r.Direction.at(1);
		if (t < t_min || t > t_max) {
			return false;
		}
		const x = r.Origin.at(0) + t * r.Direction.at(0);
		const z = r.Origin.at(2) + t * r.Direction.at(2);
		if (x < this.x0 || x > this.x1 || z < this.z0 || z > this.z1) {
			return false;
		}

		record.t = t;
		record.p = r.at(t);
		const outward_normal = new Vector3(0, 1, 0);
		record.set_front_face(r, outward_normal);
		record.material = this.mat;
		return true;
	}
}
