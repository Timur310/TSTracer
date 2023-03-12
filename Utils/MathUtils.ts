/**Return random number between 0-1 */
export function random(): number {
	return Math.random();
}

/**Return random number between min-max */
export function randomBetween(min: number, max: number): number {
	return min + (max - min) * random();
}

export function randomBetweenInt(min: number, max: number): number {
	return Math.trunc(randomBetween(min, max));
}

export function clamp(x: number, min: number, max: number): number {
	return Math.min(Math.max(x, min), max);
}

export function degreeToRadian(degree: number): number {
	return degree * Math.PI / 180.0;
}

export function abs(value: number): number {
	value = +value;
	return value < 0 ? -value : value;
}
