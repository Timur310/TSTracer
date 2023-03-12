import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { multiplyVector } from "./vecUtil.ts";
import { HitableList } from "../HittableList.ts";
import { Record } from "../Record.ts";
import { clamp } from "./MathUtils.ts";

export function writeColor(pixeColor: Color, sample: number): string {
	const scale = 1.0 / sample;

	let r = pixeColor.x;
	let g = pixeColor.y;
	let b = pixeColor.z;

	r = Math.sqrt(scale * r);
	g = Math.sqrt(scale * g);
	b = Math.sqrt(scale * b);
	return 256 * clamp(r, 0.0, 0.999) + " " + 256 * clamp(g, 0.0, 0.999) + " " +
		256 * clamp(b, 0.0, 0.999) + "\n";
}

export function rayColor(r: Ray, world: HitableList, depth: number): Color {
	if (depth <= 0) return new Color(0, 0, 0);

	if (!world.hit(r, 0.001, Number.POSITIVE_INFINITY)) {
		return new Color(0, 0, 0);
	}

	const emitted = Record.Instance.material.emitted();

	if (!Record.Instance.material.scatter(r)) return emitted;
	return multiplyVector(
		Record.Instance.attenuation,
		rayColor(Record.Instance.scattered, world, depth - 1),
	).add(emitted);
}
