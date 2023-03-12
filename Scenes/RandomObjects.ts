import { Color } from "../Color.ts";
import { HitableList } from "../HittableList.ts";
import { Lambertian } from "../Materials/Lambertian.ts";
import { SolidColor } from "../Materials/solidColor.ts";
import { Box } from "../Objects/Box.ts";
import { Sphere } from "../Objects/Sphere.ts";
import { Point } from "../Point.ts";
import { randomBetween } from "../Utils/MathUtils.ts";
import { RayTrace } from "../RayTrace.ts";
import { Camera } from "../Objects/Camera.ts";
import { Vector3 } from "../Vector3.ts";
import { DiffuseLight } from "../Materials/DiffuseLight.ts";
import { xz_rect } from "../Objects/xz_rect.ts";
import { CheckerTexture } from "../Materials/CheckerTexture.ts";

function constructBoxes(): HitableList {
	const boxes1 = new HitableList();
	const groundMat = new Lambertian(
		new SolidColor(new Color(0.48, 0.83, 0.53)),
	);

	const boxLength = 20;
	for (let i = 0; i < boxLength; i++) {
		for (let j = 0; j < boxLength; j++) {
			const w = 100;
			const x0 = -1000 + i * w;
			const z0 = -1000 + j * w;
			const y0 = 0;
			const x1 = x0 + w;
			const y1 = randomBetween(1, 101);
			const z1 = z0 + w;

			boxes1.add(
				new Box(
					new Point(x0, y0, z0),
					new Point(x1, y1, z1),
					groundMat,
				),
			);
		}
	}
	return boxes1;
}

const RayTracer = new RayTrace();

//settings
const lookFrom = new Point(478, 278, -600);
const lookat = new Point(278, 278, 0);
const vfov = 40;
const aspect_ratio = 1;
const samples = 75;
const imgWidth = 300;
const world = new HitableList();

const camera = new Camera(
	lookFrom,
	lookat,
	new Vector3(0, 1, 0),
	0.0,
	2,
	vfov,
	aspect_ratio,
);
//materials
const lightMat = new DiffuseLight(new Color(7, 7, 7));
const CheckerMat = new CheckerTexture(
	new SolidColor(new Color(137 / 255, 50 / 255, 168 / 255)),
	new SolidColor(new Color(0.9, 0.9, 0.9)),
);


//create add boxes and sphere
const sphere = new Sphere(new Point(220, 280, 300), 80, new Lambertian(CheckerMat));
world.add(sphere);
constructBoxes().getList.forEach(box => world.add(box));

//add light
world.add(new xz_rect(123, 423, 147, 421, 554, lightMat));

RayTracer.renderImage(camera, world, samples, imgWidth, aspect_ratio);
