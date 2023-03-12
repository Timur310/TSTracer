import { Color } from "./Color.ts";
import { Material } from "./Materials/Material.ts";
import { Point } from "./Point.ts";
import { Ray } from "./Ray.ts";
import { dot } from "./Utils/vecUtil.ts";
import { Vector3 } from "./Vector3.ts";
import { aabb } from "./aabb.ts";

/** global class to track infomation */
export class Record {
	p = new Point(0, 0, 0);
	normal = new Vector3(0, 0, 0);
	t = 0;
	front_face = false;
	u = 0;
	v = 0;
	output_box = new aabb();
	scattered = new Ray(new Point(0, 0, 0), new Vector3(0, 0, 0));
	attenuation = new Color(0, 0, 0);
	material!: Material;
	private static _instance: Record;

	set_front_face(r: Ray, outward_normal: Vector3): void {
		this.front_face = dot(r.getDirection, outward_normal) < 0;
		this.normal = this.front_face
			? outward_normal
			: outward_normal.negate();
	}

	public static get Instance(): Record {
		return this._instance || (this._instance = new this());
	}
}
