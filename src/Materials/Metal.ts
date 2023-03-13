import { Vector3 } from "../Math/Vector3";
import { Ray } from "../Objects/Ray";
import { Material, Record } from "../Objects/Record";

export class Metal implements Material {
	private albedo: Vector3;
	private fuzz: number;
	constructor(albedo: Vector3, fuzz: number) {
		this.albedo = albedo;
		this.fuzz = fuzz < 1 ? fuzz : 1;
	}

	emitted(record: Record): Vector3 {
		return new Vector3();
	}

	scatter(r_in: Ray, record: Record): boolean {
		const reflected = Vector3.Reflect(Vector3.unitVector(r_in.Direction),record.normal,);
		record.scattered = new Ray(record.p,Vector3.addVector(reflected, Vector3.multiplyScalar(Vector3.randomInUnitSphere(),this.fuzz)));
		record.attenuation = this.albedo;
		return (Vector3.dot(record.scattered.Direction,record.normal) > 0);
	}
}
