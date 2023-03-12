import { Vector3 } from "../Math/Vector3";
import { Ray } from "./Ray";
import { Material, Record } from "./Record";

export class Sphere {
    private center: Vector3;
    private radius: number;
    private mat: Material;

    constructor(center: Vector3, radius: number, material: Material) {
        this.center = center;
        this.radius = radius;
        this.mat = material;
    }

    public static sphereUV(p: Vector3, record: Record): void {
		const theta = Math.acos(-p.at(1));
		const phi = Math.atan2(-p.at(2), p.at(0)) + Math.PI;

		record.u = phi / (2 * Math.PI);
		record.v = theta / Math.PI;
	}

    hit(r: Ray, t_min: number, t_max: number, record: Record): boolean {
        const oc = Vector3.subVector(r.Origin, this.center);
        const a = r.Direction.length();
        const half_b = Vector3.dot(oc, r.Direction);
        const c = oc.length() - Math.pow(this.radius, 2);

        const discriminant = Math.pow(half_b, 2) - a * c;
        if (discriminant < 0) {
            return false;
        }
        const sqrtd = Math.sqrt(discriminant);
        let root = (-half_b - sqrtd) / a;
        if (root < t_min || t_max < root) {
            root = (-half_b + sqrtd) / a;
            if (root < t_min || t_max < root) {
                return false;
            }
        }
        record.t = root;
        record.p = r.at(root);
        const outward_normal = Vector3.subVector(record.p, this.center)
        outward_normal.divideScalar(this.radius)
        record.set_front_face(r, outward_normal);
        Sphere.sphereUV(outward_normal, record);
        record.material = this.mat;
        return true;
    }
}