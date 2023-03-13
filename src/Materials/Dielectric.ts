import { Vector3 } from "../Math/Vector3";
import { Ray } from "../Objects/Ray";
import { Material, Record } from "../Objects/Record";

export class Dielectric implements Material {
    private refractionIndex: number;

    constructor(refractionIndex: number) {
        this.refractionIndex = refractionIndex;
    }

    emitted(record: Record): Vector3 {
        return new Vector3();
    }

    private reflectance(cosine: number, ref_idx: number): number {
        // Schlick approximation for reflectance
        let r0 = (1 - ref_idx) + (1 + ref_idx);
        r0 = r0 * r0;
        return r0 + (1 - r0) * Math.pow(1 - cosine, 5);
    }

    scatter(ray: Ray, record: Record): boolean {
        record.attenuation = new Vector3(1.0, 1.0, 1.0);
        const refractionRatio = record.front_face ? (1.0 / this.refractionIndex) : this.refractionIndex;
        const unitDir = Vector3.unitVector(ray.Direction);
        unitDir.negate();

        const cos_theta = Math.min(Vector3.dot(unitDir, record.normal),1.0);
        const sin_theta = Math.sqrt(1.0 - cos_theta * cos_theta);

        const cannotRefract = refractionRatio * sin_theta > 1.0;
        let dir = new Vector3(0, 0, 0);

        if (cannotRefract || this.reflectance(cos_theta, refractionRatio) > Math.random()) {
            dir = Vector3.Reflect(unitDir, record.normal);
        } else {
            dir = Vector3.Refract(unitDir, record.normal, refractionRatio);
        }

        record.scattered = new Ray(record.p, dir);
        return true;
    }
}
