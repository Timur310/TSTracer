import { abs } from "./Utils/MathUtils.ts";

export class Vector3 {
	Vector = new Float32Array(3);

	constructor(x?: number, y?: number, z?: number) {
		this.Vector[0] = x ? x : 0;
		this.Vector[1] = y ? y : 0;
		this.Vector[2] = z ? z : 0;
	}

	atIndex(n: number): number {
		return this.Vector[n];
	}

	atIndexSet(idx: number, value: number): void {
		this.Vector[idx] = value;
	}

	add(v: Vector3): Vector3 {
		this.Vector[0] += v.Vector[0];
		this.Vector[1] += v.Vector[1];
		this.Vector[2] += v.Vector[2];
		return this;
	}

	substract(v: Vector3): Vector3 {
		this.Vector[0] -= v.Vector[0];
		this.Vector[1] -= v.Vector[1];
		this.Vector[2] -= v.Vector[2];
		return this;
	}

	divide(v: Vector3): Vector3 {
		this.Vector[0] /= v.Vector[0];
		this.Vector[1] /= v.Vector[1];
		this.Vector[2] /= v.Vector[2];
		return this;
	}

	divideN(n: number): Vector3 {
		this.Vector[0] /= n;
		this.Vector[1] /= n;
		this.Vector[2] /= n;
		return this;
	}

	negate(): Vector3 {
		this.Vector[0] = abs(this.Vector[0]) * -1;
		this.Vector[1] = abs(this.Vector[1]) * -1;
		this.Vector[2] = abs(this.Vector[2]) * -1;
		return this;
	}

	multiplyN(n: number): Vector3 {
		this.Vector[0] *= n;
		this.Vector[1] *= n;
		this.Vector[2] *= n;
		return this;
	}

	multiply(v: Vector3): Vector3 {
		this.Vector[0] *= v.Vector[0];
		this.Vector[1] *= v.Vector[1];
		this.Vector[2] *= v.Vector[2];
		return this;
	}

	length(): number {
		return this.lengthSquared();
	}

	sqrtLength(): number {
		return Math.sqrt(this.length());
	}


	

	private lengthSquared(): number {
		return this.Vector[0] * this.Vector[0] +
			this.Vector[1] * this.Vector[1] + this.Vector[2] * this.Vector[2];
	}

	get x(): number {
		return this.Vector[0];
	}

	get y(): number {
		return this.Vector[1];
	}

	get z(): number {
		return this.Vector[2];
	}
}
