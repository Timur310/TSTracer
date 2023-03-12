import { Vector3 } from "../Vector3.ts";
import { abs, random, randomBetween } from "./MathUtils.ts";

export function addVector(u: Vector3, v: Vector3): Vector3 {
	return new Vector3(u.x + v.x, u.y + v.y, u.z + v.z);
}

export function addVectorN(u: Vector3, n: number): Vector3 {
	return new Vector3(u.x + n, u.y + n, u.z + n);
}

export function substractVector(u: Vector3, v: Vector3): Vector3 {
	return new Vector3(u.x - v.x, u.y - v.y, u.z - v.z);
}

export function substractVectorN(u: Vector3, n: number): Vector3 {
	return new Vector3(u.x - n, u.y - n, u.z - n);
}

export function multiplyVector(u: Vector3, v: Vector3): Vector3 {
	return new Vector3(u.x * v.x, u.y * v.y, u.z * v.z);
}

export function multiplyVectorN(u: Vector3, t: number): Vector3 {
	return new Vector3(u.x * t, u.y * t, u.z * t);
}

export function divideVectorN(u: Vector3, t: number): Vector3 {
	return multiplyVectorN(u, 1 / t);
}

export function dot(u: Vector3, v: Vector3): number {
	return u.x * v.x + u.y * v.y + u.z * v.z;
}

export function cross(u: Vector3, v: Vector3): Vector3 {
	return new Vector3(
		u.y * v.z - u.z * v.y,
		u.z * v.x - u.x * v.y,
		u.x * v.y - u.y * v.x,
	);
}

export function unitVector(v: Vector3): Vector3 {
	return divideVectorN(v, v.sqrtLength());
}

export function vecRandom(): Vector3 {
	return new Vector3(random(), random(), random());
}

export function vecRandomBetween(min: number, max: number): Vector3 {
	return new Vector3(
		randomBetween(min, max),
		randomBetween(min, max),
		randomBetween(min, max),
	);
}

export function randomInUnitSphere(): Vector3 {
	while (true) {
		const p = vecRandomBetween(-1, 1);
		if (p.length() >= 1) continue;
		return p;
	}
}

export function randomUnitVector(): Vector3 {
	return unitVector(randomInUnitSphere());
}

export function randomInHemisphere(normal: Vector3): Vector3 {
	const inUnit = randomInUnitSphere();
	if (dot(inUnit, normal) > 0.0) {
		return inUnit;
	} else {
		return inUnit.negate();
	}
}

export function reflect(v: Vector3, n: Vector3): Vector3 {
	const d = multiplyVectorN(n, dot(v, n) * 2);
	return substractVector(v, d);
}

export function refract(
	uv: Vector3,
	n: Vector3,
	etai_over_etat: number,
): Vector3 {
	const cos_theta = Math.min(dot(multiplyVectorN(uv, -1), n), 1.0);

	const v = addVector(uv, multiplyVectorN(n, cos_theta));
	const r_out_perp = multiplyVectorN(v, etai_over_etat);

	const p = -Math.sqrt(abs(1.0 - r_out_perp.length()));
	const r_out_parallel = multiplyVectorN(n, p);

	return addVector(r_out_perp, r_out_parallel);
}

export function randomInUnitDisk(): Vector3 {
	while (true) {
		const p = new Vector3(randomBetween(-1, 1), randomBetween(-1, 1), 0);
		if (p.length() >= 1) continue;
		return p;
	}
}
