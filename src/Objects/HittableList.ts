import { Ray } from "./Ray";
import { Material, Record } from "./Record";

export type Hittable = {
	mat: Material;
	hit(r: Ray, t_min: number, t_max: number, record: Record): boolean;
}

export class HittableList {

	private hittableObjects: Hittable[] = [];

	constructor() { }

	public clear(): void {
		this.hittableObjects = [];
	}

	get getList(): Hittable[] {
		return this.hittableObjects;
	}

	public add(obj: Hittable) {
		this.hittableObjects.push(obj);
	}

	public hit(r: Ray, t_min: number, t_max: number, record: Record): boolean {
		let hit_anything = false;
		let closest_so_far = t_max;

		for (const obj of this.getList) {
			if (obj.hit(r, t_min, closest_so_far, record)) {
				hit_anything = true;
				closest_so_far = record.t;
			}
		}
		return hit_anything;
	}
}