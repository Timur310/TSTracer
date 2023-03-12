import { Material } from "./Materials/Material.ts";
import { Ray } from "./Ray.ts";

export interface Hittable {
	mat: Material;
	hit(r: Ray, t_min: number, t_max: number): boolean;
	bounding_box(): boolean;
}
