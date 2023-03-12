import { Vector3 } from "./Vector3.ts";

export class Point extends Vector3 {
	constructor(x?: number, y?: number, z?: number) {
		super(x ? x : 0, y ? y : 0, z ? z : 0);
	}
}
