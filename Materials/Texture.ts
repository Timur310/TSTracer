import { Color } from "../Color.ts";
import { Point } from "../Point.ts";

export interface Texture {
	value(u: number, v: number, p: Point): Color;
}
