import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { random } from "../Utils/MathUtils.ts";
import { dot, reflect, refract, unitVector } from "../Utils/vecUtil.ts";
import { Vector3 } from "../Vector3.ts";
import { Material } from "./Material.ts";

export class Dielectric implements Material {
	private refractionIndex: number;
	constructor(refractionIndex: number) {
		this.refractionIndex = refractionIndex;
	}

	emitted(): Color {
		return new Color();
	}

	private reflectance(cosine: number, ref_idx: number): number {
		// Schlick approximation for reflectance
		let r0 = (1 - ref_idx) + (1 + ref_idx);
		r0 = r0 * r0;
		return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
	}

	scatter(r_in: Ray): boolean {
		Record.Instance.attenuation = new Color(1.0, 1.0, 1.0);
		const refractionRatio = Record.Instance.front_face
			? (1.0 / this.refractionIndex)
			: this.refractionIndex;
		const unitDir = unitVector(r_in.getDirection);

		const cos_theta = Math.min(
			dot(unitDir.negate(), Record.Instance.normal),
			1.0,
		);
		const sin_theta = Math.sqrt(1.0 - cos_theta * cos_theta);

		const cannotRefract = refractionRatio * sin_theta > 1.0;
		let dir = new Vector3(0, 0, 0);

		if (
			cannotRefract ||
			this.reflectance(cos_theta, refractionRatio) > random()
		) {
			dir = reflect(unitDir, Record.Instance.normal);
		} else {
			dir = refract(unitDir, Record.Instance.normal, refractionRatio);
		}

		Record.Instance.scattered = new Ray(Record.Instance.p, dir);
		return true;
	}
}
