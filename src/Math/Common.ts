export function clamp(x: number, min: number, max: number): number {
	return Math.min(Math.max(x, min), max);
}

export function randomBetween(min: number, max: number): number {
	return min + (max - min) * Math.random();
}

export function randomBetweenInt(min: number, max: number): number {
	return Math.trunc(randomBetween(min, max));
}

export function degreeToRadian(degree: number): number {
	return degree * Math.PI / 180.0;
}


export function gcd(a: number, b: number): number {
	if (b > a) {
		const temp = a; a = b; b = temp
	}
	while (b != 0) {
		const m = a % b; a = b; b = m;
	}
	return a;
}

export function ratio(x: number, y: number): number {
	const c = gcd(x, y);
	return c;
}
