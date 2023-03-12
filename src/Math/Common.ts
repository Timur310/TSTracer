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
