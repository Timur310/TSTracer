import { aabb } from "../aabb.ts";
import { Hittable } from "../Hittable.ts";
import { Material } from "../Materials/Material.ts";
import { Point } from "../Point.ts";
import { Ray } from "../Ray.ts";
import { degreeToRadian } from "../Utils/MathUtils.ts";
import { Record } from "../Record.ts";
import { Vector3 } from "../Vector3.ts";

export class Rotate_y implements Hittable {
	mat!: Material;
	private sin_theta: number;
	private cos_theta: number;
	private hasbox: boolean;
	private p: Hittable;
	private bbox = new aabb();

	constructor(p: Hittable, angle: number) {
		const radians = degreeToRadian(angle);
		this.p = p;
		this.sin_theta = Math.sin(radians);
		this.cos_theta = Math.cos(radians);

		this.hasbox = p.bounding_box();

		const min = new Point(
			Number.POSITIVE_INFINITY,
			Number.POSITIVE_INFINITY,
			Number.POSITIVE_INFINITY,
		);
		const max = new Point(
			Number.NEGATIVE_INFINITY,
			Number.NEGATIVE_INFINITY,
			Number.NEGATIVE_INFINITY,
		);
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 2; j++) {
				for (let k = 0; k < 2; k++) {
					const x = i * this.bbox.max.x +
						(1 - i) * this.bbox.min.x;
					const y = j * this.bbox.max.y +
						(1 - j) * this.bbox.min.y;
					const z = k * this.bbox.max.z +
						(1 - k) * this.bbox.min.z;

					const newx = this.cos_theta * x + this.sin_theta * z;
					const newz = -this.sin_theta * x + this.cos_theta * z;

					const tester = new Vector3(newx, y, newz);

					for (let c = 0; c < 3; c++) {
						min.atIndexSet(
							c,
							Math.min(min.atIndex(c), tester.atIndex(c)),
						);
						max.atIndexSet(
							c,
							Math.max(max.atIndex(c), tester.atIndex(c)),
						);
					}
				}
			}
		}
		this.bbox = new aabb(min, max);
	}

	hit(r: Ray, t_min: number, t_max: number): boolean {
		const origin = new Vector3(
			r.getOrigin.x,
			r.getOrigin.y,
			r.getOrigin.z,
		);
		const direction = new Vector3(
			r.getDirection.x,
			r.getDirection.y,
			r.getDirection.z,
		);

		origin.atIndexSet(
			0,
			this.cos_theta * r.getOrigin.atIndex(0) -
				this.sin_theta * r.getOrigin.atIndex(2),
		);
		origin.atIndexSet(
			2,
			this.sin_theta * r.getOrigin.atIndex(0) +
				this.cos_theta * r.getOrigin.atIndex(2),
		);

		direction.atIndexSet(
			0,
			this.cos_theta * r.getDirection.atIndex(0) -
				this.sin_theta * r.getDirection.atIndex(2),
		);
		direction.atIndexSet(
			2,
			this.sin_theta * r.getDirection.atIndex(0) +
				this.cos_theta * r.getDirection.atIndex(2),
		);

		const rotated_r = new Ray(origin, direction);

		if (!this.p.hit(rotated_r, t_min, t_max)) return false;

		const p = new Point(
			Record.Instance.p.x,
			Record.Instance.p.y,
			Record.Instance.p.z,
		);
		const normal = new Point(
			Record.Instance.normal.x,
			Record.Instance.normal.y,
			Record.Instance.normal.z,
		);

		p.atIndexSet(
			0,
			this.cos_theta * Record.Instance.p.atIndex(0) +
				this.sin_theta * Record.Instance.p.atIndex(2),
		);
		p.atIndexSet(
			2,
			-this.sin_theta * Record.Instance.p.atIndex(0) +
				this.cos_theta * Record.Instance.p.atIndex(2),
		);

		normal.atIndexSet(
			0,
			this.cos_theta * Record.Instance.normal.atIndex(0) +
				this.sin_theta * Record.Instance.normal.atIndex(2),
		);
		normal.atIndexSet(
			2,
			-this.sin_theta * Record.Instance.normal.atIndex(0) +
				this.cos_theta * Record.Instance.normal.atIndex(2),
		);

		Record.Instance.p = p;
		Record.Instance.set_front_face(rotated_r, normal);
		return true;
	}

	bounding_box(): boolean {
		Record.Instance.output_box = this.bbox;
		return true;
	}
}
