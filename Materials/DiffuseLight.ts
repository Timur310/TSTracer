import { Color } from "../Color.ts";
import { Ray } from "../Ray.ts";
import { Material } from "./Material.ts";
import { SolidColor } from "./solidColor.ts";
import { Record } from "../Record.ts";

export class DiffuseLight implements Material {
	emit: SolidColor;

	constructor(color: Color) {
		this.emit = new SolidColor(color);
	}

	scatter(_r: Ray): boolean {
		return false;
	}

	emitted(): Color {
		return this.emit.value(
			Record.Instance.u,
			Record.Instance.v,
			Record.Instance.p,
		);
	}
}
