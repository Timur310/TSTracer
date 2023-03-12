import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";

export interface Material {
	scatter(r: Ray): boolean;
	emitted(): Color;
}
