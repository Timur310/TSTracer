import { Color } from "../Color.ts";
import { HitableList } from "../HittableList.ts";
import { Camera } from "../Objects/Camera.ts";
import { Sphere } from "../Objects/Sphere.ts";
import { Point } from "../Point.ts";
import { RayTrace } from "../RayTrace.ts";
import { Lambertian } from "../Materials/Lambertian.ts";
import { Metal } from "../Materials/Metal.ts";
import { Dielectric } from "../Materials/Dielectric.ts";
import { Vector3 } from "../Vector3.ts";
import { substractVector } from "../Utils/vecUtil.ts";
import { random, randomBetween } from "../Utils/MathUtils.ts";
import { SolidColor } from "../Materials/solidColor.ts";
import { CheckerTexture } from "../Materials/CheckerTexture.ts";

function randomScene(): HitableList {
	const world = new HitableList();

	const ground_material = new CheckerTexture(
		new SolidColor(new Color(0.2, 0.3, 0.1)),
		new SolidColor(new Color(0.9, 0.9, 0.9)),
	);

	for (let a = -11; a < 11; a++) {
		for (let b = -11; b < 11; b++) {
			const mat = random();
			const center = new Point(
				a + 0.9 * random(),
				-0.3,
				b + 0.9 * random(),
			);

			if (
				substractVector(center, new Point(4, 0, 0)).sqrtLength() > 0.9
			) {
				if (mat < 0.8) {
					const albedo = new Color(random(), random(), random());
					const sphere_mat = new Lambertian(new SolidColor(albedo));
					world.add(
						new Sphere(center, randomBetween(0.2, 0.3), sphere_mat),
					);
				} else if (mat < 0.95) {
					const albedo = new Color(
						randomBetween(0.5, 1),
						randomBetween(0.5, 1),
						randomBetween(0.5, 1),
					);
					const fuzz = randomBetween(0, 0.5);
					const sphere_mat = new Metal(albedo, fuzz);
					world.add(
						new Sphere(center, randomBetween(0.2, 0.3), sphere_mat),
					);
				} else {
					const sphere_mat = new Dielectric(1.5);
					world.add(
						new Sphere(center, randomBetween(0.2, 0.3), sphere_mat),
					);
				}
			}
		}
	}

	const mat1 = new Dielectric(1.5);
	const mat3 = new Metal(new Color(0.7, 0.6, 0.5), 0.0);
	const mat2 = new Lambertian(new SolidColor(new Color(0.4, 0.2, 0.1)));

	world.add(new Sphere(new Point(-1.5, 0, -3), 1.0, mat1));

	world.add(new Sphere(new Point(0, 0, -2), 1.0, mat3));

	world.add(new Sphere(new Point(1, 0, -1), 1.0, mat2));

	world.add(
		new Sphere(
			new Color(0.0, -1000.5, -1.0),
			1000,
			new Lambertian(ground_material),
		),
	);

	return world;
}

const rayTracer = new RayTrace();

// settings
const img_width = 512;
const sample = 50;
const aspect_ratio = 16 / 9;

// Camera
const lookfrom = new Point(-0.25, 1, 0.5);
const lookat = new Point(0, 0, -1);
const vUp = new Vector3(0, 1, 0);
const dist_to_focus = 1.5;
const aperture = 0.1;
const camera = new Camera(
	lookfrom,
	lookat,
	vUp,
	aperture,
	dist_to_focus,
	90,
	aspect_ratio,
);

// world
const world = randomScene();

rayTracer.renderImage(camera, world, sample, img_width, aspect_ratio);
