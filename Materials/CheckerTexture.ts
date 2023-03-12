import { Color } from "../Color.ts";
import { Point } from "../Point.ts";
import { Record } from "../Record.ts";
import { SolidColor } from "./solidColor.ts";
import { Texture } from "./Texture.ts";

export class CheckerTexture implements Texture {
	private even: SolidColor;
	private odd: SolidColor;

	constructor(c1: SolidColor, c2: SolidColor) {
		this.even = c1;
		this.odd = c2;
	}

	value(_u: number, _v: number, p: Point): Color {
		const sines = Math.sin(10 * p.x) * Math.sin(10 * p.y) *
			Math.sin(10 * p.z);
		if (sines < 0) {
			return this.odd.value(
				Record.Instance.u,
				Record.Instance.v,
				Record.Instance.p,
			);
		} else {
			return this.even.value(
				Record.Instance.u,
				Record.Instance.v,
				Record.Instance.p,
			);
		}
	}
}
