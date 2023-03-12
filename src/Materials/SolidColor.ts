import { Vector3 } from "../Math/Vector3";

export type Texture = {
    value(u: number, v: number, p: Vector3): Vector3;
}

export class SolidColor implements Texture {
    private color: Vector3;

    constructor(c?: Vector3) {
        this.color = c ? c : new Vector3();
    }

    value(_u: number, _v: number, _p: Vector3): Vector3 {
        return this.color;
    }
}
