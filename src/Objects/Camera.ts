import { degreeToRadian } from "../Math/Common";
import { Vector3 } from "../Math/Vector3";
import { Ray } from "./Ray";

export class Camera {
    private lookFrom: Vector3;
    private lookAt: Vector3;
    private vUp: Vector3;

    private aperture: number;
    private focusDist: number;
    private lensRadius: number;

    private w: Vector3;
    private u: Vector3;
    private v: Vector3;

    private theta: number;
    private h: number;
    private viewport_height: number;
    private viewport_width: number;

    private origin: Vector3;
    private horizontal: Vector3;
    private vertical: Vector3;
    private lower_left_corner: Vector3;

    constructor(lookFrom: Vector3,lookAt: Vector3,vUp: Vector3,aperture: number,focusDist: number,fov: number,aspect_ratio: number) {
        this.aperture = aperture;
        this.focusDist = focusDist;

        this.theta = degreeToRadian(fov);
        this.h = Math.tan(this.theta / 2.0);

        this.viewport_height = 2.0 * this.h;
        this.viewport_width = aspect_ratio * this.viewport_height;

        this.lookAt = lookAt;
        this.lookFrom = lookFrom;
        this.vUp = vUp;

        this.w = Vector3.unitVector(Vector3.subVector(this.lookFrom, this.lookAt));
        this.u = Vector3.unitVector(Vector3.cross(this.vUp, this.w));
        this.v = Vector3.cross(this.w, this.u);

        this.origin = this.lookFrom;
        this.horizontal = Vector3.multiplyScalar(this.u,this.viewport_width * focusDist);
        this.vertical = Vector3.multiplyScalar(this.v,this.viewport_height * this.focusDist);

        const lower_left_temp = Vector3.subVector(this.origin, Vector3.divideScalar(this.horizontal, 2));
        lower_left_temp.subVector(Vector3.divideScalar(this.vertical, 2));
        lower_left_temp.subVector(Vector3.multiplyScalar(this.w, this.focusDist));
        this.lower_left_corner = lower_left_temp;

        this.lensRadius = this.aperture / 2;
    }

    public getRay(u: number, v: number): Ray {
        const rd = Vector3.randomInUnitDisk();
        rd.multiplyScalar(this.lensRadius);

        const offset = Vector3.multiplyScalar(this.u, rd.at(0))
        offset.addVector(Vector3.multiplyScalar(this.v, rd.at(1)));

        const a1 = Vector3.multiplyScalar(this.horizontal, u);
        const a2 = Vector3.multiplyScalar(this.vertical, v);

        const tempO = Vector3.addVector(this.origin, offset);
        const tempDir = Vector3.addVector(this.lower_left_corner, a1);

        tempDir.addVector(a2);
        tempDir.subVector(this.origin);
        tempDir.subVector(offset);

        return new Ray(tempO,tempDir);
    }
}
