import { Vector3 } from "../Math/Vector3";

export class Ray {

    private direction: Vector3;
    private origin: Vector3;

    constructor(origin: Vector3, direction: Vector3) {
        this.direction = direction;
        this.origin = origin;
    }

	public at(t: number): Vector3 {
		const out = new Vector3(this.Direction.at(0),this.Direction.at(1),this.Direction.at(2))
		out.multiplyScalar(t)
		out.addVector(this.origin)
		return out;
	}

	get Direction(): Vector3 {
		return this.direction;
	}

	get Origin(): Vector3 {
		return this.origin;
	}
}