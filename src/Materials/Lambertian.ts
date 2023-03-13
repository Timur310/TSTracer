import { Vector3 } from "../Math/Vector3";
import { Ray } from "../Objects/Ray";
import { Material, Record } from "../Objects/Record";
import { Texture } from "./SolidColor";

export class Lambertian implements Material {
    albedo: Texture;
    constructor(albedo: Texture) {
        this.albedo = albedo;
    }

    public scatteringPdf(record: Record, ray: Ray, ray_scattered: Ray): number {
        const cosine = Vector3.dot(record.normal, Vector3.unitVector(ray_scattered.Direction));
        return cosine < 0 ? 0 : cosine / Math.PI;
    }

    public emitted(record: Record): Vector3 {
        return new Vector3(0, 0, 0);
    }

    public scatter(ray: Ray, record: Record, alb: Vector3, scattered: Ray, pdf: number): boolean {
        let scatterDir = Vector3.addVector(record.normal, Vector3.randomInUnitSphere());
        if (scatterDir.nearZero()) {
            scatterDir = record.normal;
        }
        scattered = new Ray(record.p, Vector3.unitVector(direction));
        alb = this.albedo.value(record.u, record.v, record.p, record);
        pdf = Vector3.dot(record.normal, scattered.Direction) / Math.PI;

        return true;
    }
}