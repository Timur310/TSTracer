import { HitableList } from "./HittableList.ts";
import { Point } from "./Point.ts";
import { Camera } from "./Objects/Camera.ts";
import { rayColor, writeColor } from "./Utils/ImageUtils.ts";
import { random } from "./Utils/MathUtils.ts";

export class RayTrace {
	async renderImage(camera: Camera,world: HitableList,samples_per_pixel: number,img_width: number,aspectratio: number,): Promise<void> {
		const aspect_ratio = aspectratio;
		const image_width = img_width;
		const image_height = image_width / aspect_ratio;
		const max_depth = 10;

		let imgContent = "P3\n" + image_width + " " + image_height + "\n255\n";

		for (let j = image_height - 1; j >= 0; --j) {
			console.log(j);
			for (let i = 0; i < image_width; ++i) {
				const pixelColor = new Point();
				for (let s = 0; s < samples_per_pixel; ++s) {
					const u = (i + random()) / (image_width - 1);
					const v = (j + random()) / (image_height - 1);
					const r = camera.getRay(u, v);
					pixelColor.add(rayColor(r, world, max_depth));
				}
				imgContent += writeColor(pixelColor, samples_per_pixel);
			}
			console.clear();
		}
		await Deno.writeTextFile("./output.ppm", imgContent);
	}
}
