import { Hittable } from "../Hittable.ts";
import { Material } from "../Materials/Material.ts";
import { Ray } from "../Ray.ts";
import { addVector, substractVector } from "../Utils/vecUtil.ts";
import { Vector3 } from "../Vector3.ts";
import { Record } from "../Record.ts";
import { aabb } from "../aabb.ts";

export class Translate implements Hittable {
	private p: Hittable;
	private offset: Vector3;

	mat!: Material;

	constructor(p: Hittable, displacement: Vector3) {
		this.p = p;
		this.offset = displacement;
	}

	hit(r: Ray, t_min: number, t_max: number): boolean {
		const moved_r = new Ray(
			substractVector(r.getOrigin, this.offset),
			r.getDirection,
		);
		if (!this.p.hit(moved_r, t_min, t_max)) return false;

		Record.Instance.p.add(this.offset);
		Record.Instance.set_front_face(moved_r, Record.Instance.normal);

		return true;
	}

	bounding_box(): boolean {
		if (!this.p.bounding_box()) return false;

		Record.Instance.output_box = new aabb(
			addVector(Record.Instance.output_box.min, this.offset),
			addVector(Record.Instance.output_box.max, this.offset),
		);
		return true;
	}
}
