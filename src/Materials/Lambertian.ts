import { Vector3 } from "../Math/Vector3";
import { Ray } from "../Objects/Ray";
import { Record } from "../Objects/Record";
import { Material, Texture } from "./SolidColor";

export class Lambertian implements Material {
    albedo: Texture;
    constructor(albedo: Texture) {
        this.albedo = albedo;
    }

    public emitted(): Vector3 {
        return new Vector3(0, 0, 0);
    }

    public scatter(record: Record): boolean {
        let scatterDir = Vector3.addVector(record.normal, Vector3.randomInUnitSphere());
        if (scatterDir.nearZero()) {
            scatterDir = record.normal;
        }
        record.scattered = new Ray(record.p, scatterDir);
        record.attenuation = this.albedo.value(
            record.u,
            record.v,
            record.p,
        );
        return true;
    }
}