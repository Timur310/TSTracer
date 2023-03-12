import { Vector3 } from "../Math/Vector3";
import { Material, Record } from "../Objects/Record";
import { SolidColor } from "./SolidColor";

export class DiffuseLight implements Material {
	emit: SolidColor;
	constructor(color: Vector3) {
		this.emit = new SolidColor(color);
	}

	scatter(record: Record): boolean {
		return false;
	}

	emitted(record: Record): Vector3 {
		return this.emit.value(
			record.u,
			record.v,
			record.p,
		);
	}
}
