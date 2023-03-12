import { Color } from "../Color.ts";
import { Point } from "../Point.ts";
import { Texture } from "./Texture.ts";

export class SolidColor implements Texture {
	private color: Color;

	constructor(c?: Color) {
		this.color = c ? c : new Color();
	}

	value(_u: number, _v: number, _p: Point): Color {
		return this.color;
	}
}
