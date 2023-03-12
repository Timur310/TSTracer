import { Vector3 } from "../Math/Vector3";
import { Ray } from "./Ray";

export type Material = {
    scatter(r: Ray): boolean;
	emitted(): Vector3;
}

export type Texture = {
	value(u: number, v: number, p: Vector3): Vector3;
}

export type Hittable = {
	mat: Material;
	hit(r: Ray, t_min: number, t_max: number): boolean;
	bounding_box(): boolean;
}

export class Record {
    public p = new Vector3(0, 0, 0);
	public normal = new Vector3(0, 0, 0);
	public t = 0;
	public front_face = false;
	public u = 0;
	public v = 0;
	public scattered = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
	public attenuation = new Vector3(0, 0, 0);
	public material: Material;

	public set_front_face(r: Ray, outward_normal: Vector3): void {
		this.front_face = Vector3.dot(r.Direction, outward_normal) < 0;
        if(this.front_face) {
            this.normal = outward_normal
        } else {
            outward_normal.negate()
            this.normal = outward_normal;
        }
	}

    constructor() { }
}