import { writeFileSync } from 'fs';
import { SceneData } from '../test';
import { Dielectric } from './Materials/Dielectric';
import { DiffuseLight } from './Materials/DiffuseLight';
import { Lambertian } from './Materials/Lambertian';
import { Metal } from './Materials/Metal';
import { SolidColor } from './Materials/SolidColor';
import { clamp, ratio } from './Math/Common';
import { Vector3 } from './Math/Vector3';
import { Camera } from './Objects/Camera';
import { HittableList } from './Objects/HittableList';
import { Ray } from './Objects/Ray';
import { Record } from './Objects/Record';
import { Sphere } from './Objects/Sphere';
import { xy_rect } from './Objects/xy_rect';
import { xz_rect } from './Objects/xz_rect';
import { yz_rect } from './Objects/yz_rect';
import { parseCamera, parseScene } from './SceneParser';

export class Tracer {

	private scene: SceneData

	constructor(scene: SceneData) {
		this.scene = scene;
	}

	private rayColor(r: Ray, scene: HittableList, depth: number, record: Record): Vector3 {
		if (depth <= 0) return new Vector3(0, 0, 0);
		if (!scene.hit(r, 0.001, Number.POSITIVE_INFINITY, record)) {
			return new Vector3(0, 0, 0);
		}

		const emitted = record.material.emitted(record);

		if (!record.material.scatter(r, record)) return emitted;
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
		const camera = parseCamera(this.scene)
		const scene = parseScene(this.scene)
		const record = new Record();

		let img = `P3\n${this.scene.settings.width} ${this.scene.settings.height} \n255\n`;

		for (let j = this.scene.settings.height - 1; j >= 0; --j) {
			console.log(j);
			for (let i = 0; i < this.scene.settings.width; ++i) {
				const finalColor = new Vector3(0, 0, 0);
				for (let s = 0; s < this.scene.settings.max_samples; ++s) {
					const u = (i + Math.random()) / (this.scene.settings.width - 1);
					const v = (j + Math.random()) / (this.scene.settings.height - 1);
					const r = camera.getRay(u, v);
					finalColor.addVector(this.rayColor(r, scene, this.scene.settings.max_depth, record));
				}
				img += this.writeColor(finalColor, this.scene.settings.max_samples);
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