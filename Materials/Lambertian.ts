import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import { addVector, randomUnitVector } from "../Utils/vecUtil.ts";
import { Material } from "./Material.ts";
import { Texture } from "./Texture.ts";

export class Lambertian implements Material {
	albedo: Texture;
	constructor(albedo: Texture) {
		this.albedo = albedo;
	}

	emitted(): Color {
		return new Color(0, 0, 0);
	}

	scatter(): boolean {
		let scatterDir = addVector(Record.Instance.normal, randomUnitVector());
		if (scatterDir.nearZero()) {
			scatterDir = Record.Instance.normal;
		}
		Record.Instance.scattered = new Ray(Record.Instance.p, scatterDir);
		Record.Instance.attenuation = this.albedo.value(
			Record.Instance.u,
			Record.Instance.v,
			Record.Instance.p,
		);
		return true;
	}
}
