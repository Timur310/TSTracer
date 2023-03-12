import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { Record } from "../Record.ts";
import {
	addVector,
	dot,
	randomInUnitSphere,
	reflect,
	unitVector,
} from "../Utils/vecUtil.ts";
import { Material } from "./Material.ts";

export class Metal implements Material {
	albedo: Color;
	fuzz: number;
	constructor(albedo: Color, fuzz: number) {
		this.albedo = albedo;
		this.fuzz = fuzz < 1 ? fuzz : 1;
	}

	emitted(): Color {
		return new Color();
	}

	scatter(r_in: Ray): boolean {
		const reflected = reflect(
			unitVector(r_in.getDirection),
			Record.Instance.normal,
		);
		Record.Instance.scattered = new Ray(
			Record.Instance.p,
			addVector(reflected, randomInUnitSphere().multiplyN(this.fuzz)),
		);
		Record.Instance.attenuation = this.albedo;
		return (dot(
			Record.Instance.scattered.getDirection,
			Record.Instance.normal,
		) > 0);
	}
}
