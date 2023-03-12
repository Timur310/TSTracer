import { writeFileSync } from 'fs'
import { Lambertian } from './Materials/Lambertian';
import { SolidColor } from './Materials/SolidColor';
import { clamp } from './Math/Common';
import { Vector3 } from './Math/Vector3';
import { Camera } from './Objects/Camera';
import { HittableList } from './Objects/HittableList';
import { Ray } from './Objects/Ray';
import { Record } from './Objects/Record';
import { Sphere } from './Objects/Sphere';

export class Tracer {

	private width: number;
	private height: number;
	private aspectRatio: number

	constructor(width: number, height: number, aspectRatio: number) {
		this.width = width;
		this.height = height;
		this.aspectRatio = aspectRatio;
	}

	private rayColor(r: Ray, scene: HittableList, depth: number, record: Record): Vector3 {
		if (depth <= 0) return new Vector3(0, 0, 0);
		if (!scene.hit(r, 0.001, Number.POSITIVE_INFINITY, record)) {
			return new Vector3(0, 0, 0);
		}

		const emitted = record.material.emitted();

		if (!record.material.scatter(r)) return emitted;
		const currColor = Vector3.multiplyVector(record.attenuation, this.rayColor(record.scattered, scene, depth - 1, record));
		currColor.addVector(emitted)
		return currColor;
	}

	private writeColor(pixel: Vector3, sample: number): string {
		const scale = 1.0 / sample;

		let r = pixel.at(0);
		let g = pixel.at(1);
		let b = pixel.at(2);

		r = Math.sqrt(scale * r);
		g = Math.sqrt(scale * g);
		b = Math.sqrt(scale * b);

		return `${255 * clamp(r, 0.0, 0.999)} ${255 * clamp(g, 0.0, 0.999)} ${255 * clamp(b, 0.0, 0.999)} \n`;
	}

	public async renderImage(): Promise<void> {
		const max_depth = 10;
		const max_samples = 1;

		// Camera
		const lookfrom = new Vector3(-0.25, 1, 0.5);
		const lookat = new Vector3(0, 0, -1);
		const vUp = new Vector3(0, 1, 0);
		const dist_to_focus = 1.5;
		const aperture = 0.1;

		const camera = new Camera(lookfrom, lookat, vUp, aperture, dist_to_focus, 40, this.aspectRatio);
		const scene = new HittableList();
		scene.add(new Sphere(new Vector3(0, 0, -2), 1.0, new Lambertian(new SolidColor(.5,.5,0))))
		const record = new Record();

		let img = `P3\n${this.width} ${this.height} n\255\n`;

		for (let j = this.height - 1; j >= 0; --j) {
			console.log(j);
			for (let i = 0; i < this.width; ++i) {
				const finalColor = new Vector3(0, 0, 0);
				for (let s = 0; s < max_samples; ++s) {
					const u = (i + Math.random()) / (this.width - 1);
					const v = (j + Math.random()) / (this.height - 1);
					const r = camera.getRay(u, v);
					finalColor.addVector(this.rayColor(r, scene, max_depth, record));
				}
				img += this.writeColor(finalColor, max_samples);
			}
			console.clear();
		}
		try {
			writeFileSync('image.ppm', img);
			console.log('Image rendered')
		} catch (error) {
			console.log(error)
		}
	}
}