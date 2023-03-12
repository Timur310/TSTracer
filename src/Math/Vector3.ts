import { randomBetween } from "./Common";

export class Vector3 {

	private components: Float64Array;
	private EPSILON = 0.00001;

	public static multiplyVector(u: Vector3, v: Vector3): Vector3 {
		const out = Vector3.copyVector(u)
		out.multiplyVector(v);
		return out;
	}

	public static copyVector(v: Vector3): Vector3 {
		return new Vector3(v.at(0), v.at(1), v.at(2));
	}

	public static unitVector(v: Vector3): Vector3 {
		const out = Vector3.copyVector(v);
		out.divideScalar(v.sqrtLength());
		return out;
	}

	public static multiplyScalar(v: Vector3, n: number): Vector3 {
		const out = Vector3.copyVector(v)
		out.multiplyScalar(n);
		return out;
	}

	public static divideScalar(v: Vector3, n: number): Vector3 {
		const out = Vector3.copyVector(v);
		out.divideScalar(n);
		return out;
	}

	public static subVector(u: Vector3, v: Vector3): Vector3 {
		const out = Vector3.copyVector(u)
		out.subVector(v);
		return out;
	}

	public static addVector(u: Vector3, v: Vector3): Vector3 {
		const out = Vector3.copyVector(u);
		out.addVector(v);
		return out;
	}

	public static cross(u: Vector3, v: Vector3): Vector3 {
		return new Vector3(
			u.at(1) * v.at(2) - u.at(2) * v.at(1),
			u.at(2) * v.at(0) - u.at(0) * v.at(1),
			u.at(0) * v.at(1) - u.at(1) * v.at(0),
		);
	}

	public static dot(u: Vector3, v: Vector3): number {
		return u.components[0] * v.components[0] + u.components[1] * v.components[1] + u.components[2] * v.components[2];
	}

	public static randomInUnitDisk(): Vector3 {
		while (true) {
			const p = new Vector3(randomBetween(-1, 1), randomBetween(-1, 1), 0);
			if (p.length() >= 1) continue;
			return p;
		}
	}

	public static vecRandomBetween(min: number, max: number): Vector3 {
		return new Vector3(
			randomBetween(min, max),
			randomBetween(min, max),
			randomBetween(min, max),
		);
	}

	public static randomInUnitSphere(): Vector3 {
		while (true) {
			const p = this.vecRandomBetween(-1, 1);
			if (p.length() >= 1) continue;
			return p;
		}
	}

	constructor(x?: number, y?: number, z?: number) {
		this.components = new Float64Array(3);
		this.components[0] = x ? x : 0;
		this.components[1] = y ? y : 0;
		this.components[2] = z ? z : 0;
	}

	public at(index: number): number {
		return this.components[index]
	}

	public setAt(index: number, value: number): void {
		this.components[index] = value;
	}

	public addScalar(value: number): void {
		this.components[0] += value;
		this.components[1] += value;
		this.components[2] += value;
	}

	public subScalar(value: number): void {
		this.components[0] -= value;
		this.components[1] -= value;
		this.components[2] -= value;
	}

	public subVector(v: Vector3): void {
		this.components[0] -= v.at(0);
		this.components[1] -= v.at(1);
		this.components[2] -= v.at(2);
	}

	public addVector(v: Vector3): void {
		this.components[0] += v.at(0);
		this.components[1] += v.at(1);
		this.components[2] += v.at(2);
	}

	public multiplyVector(v: Vector3): void {
		this.components[0] *= v.at(0);
		this.components[1] *= v.at(1);
		this.components[2] *= v.at(2);
	}

	public multiplyScalar(value: number): void {
		this.components[0] *= value;
		this.components[1] *= value;
		this.components[2] *= value;
	}

	public divideVector(v: Vector3): void {
		this.components[0] /= v.at(0);
		this.components[1] /= v.at(1);
		this.components[2] /= v.at(2);
	}

	public divideScalar(value: number): void {
		this.components[0] /= value;
		this.components[1] /= value;
		this.components[2] /= value;
	}

	public negate(): void {
		this.components[0] = -this.components[0]
		this.components[1] = -this.components[1]
		this.components[2] = -this.components[2]
	}

	private lengthSquared(): number {
		return this.components[0] * this.components[0] + this.components[1] * this.components[1] + this.components[2] * this.components[2];
	}

	public length(): number {
		return this.lengthSquared();
	}

	public sqrtLength(): number {
		return Math.sqrt(this.length());
	}

	public nearZero(): boolean {
		const s = this.EPSILON;
		return (
			Math.abs(this.components[0]) < s &&
			Math.abs(this.components[1]) < s &&
			Math.abs(this.components[2]) < s
		);
	}
}