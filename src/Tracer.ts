import { writeFileSync } from 'fs';
import { DiffuseLight } from './Materials/DiffuseLight';
import { Lambertian } from './Materials/Lambertian';
import { SolidColor } from './Materials/SolidColor';
import { clamp } from './Math/Common';
import { Vector3 } from './Math/Vector3';
import { Camera } from './Objects/Camera';
import { HittableList } from './Objects/HittableList';
import { Ray } from './Objects/Ray';
import { Record } from './Objects/Record';
import { Sphere } from './Objects/Sphere';
import { xy_rect } from './Objects/xy_rect';
import { xz_rect } from './Objects/xz_rect';
import { yz_rect } from './Objects/yz_rect';

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

		const emitted = record.material.emitted(record);

		if (!record.material.scatter(record)) return emitted;
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

	private setupScene(scene: HittableList): void {
		scene.add(new yz_rect(0,555,0,555,555,new Lambertian(new SolidColor(new Vector3(.12, .45, .15)))));
		scene.add(new yz_rect(0,555,0,555,0,new Lambertian(new SolidColor(new Vector3(.65, .05, .05)))));
		scene.add(new xz_rect(0,555,0,555,0,new Lambertian(new SolidColor(new Vector3(.73, .73, .73)))));
		scene.add(new xz_rect(0,555,0,555,555,new Lambertian(new SolidColor(new Vector3(.73, .73, .73)))));
		scene.add(new xy_rect(0,555,0,555,555,new Lambertian(new SolidColor(new Vector3(.73, .73, .73)))));
		scene.add(new xz_rect(213,343,227,332,554,new DiffuseLight(new Vector3(15, 15, 15)))); // light
	}

	public async renderImage(): Promise<void> {
		const max_depth = 10;
		const max_samples = 50;

		// Camera
		const lookfrom = new Vector3(278, 278, -800);
		const lookat = new Vector3(278, 278, 0);
		const vUp = new Vector3(0, 1, 0);
		const dist_to_focus = 1.5;
		const aperture = 0.001;

		const camera = new Camera(lookfrom, lookat, vUp, aperture, dist_to_focus, 40, this.aspectRatio);
		const scene = new HittableList();

		this.setupScene(scene)

		const record = new Record();

		let img = `P3\n${this.width} ${this.height} \n255\n`;

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