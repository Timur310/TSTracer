import { Vector3 } from "../Math/Vector3";
import { Record } from "../Objects/Record";
import { SolidColor, Texture } from "./SolidColor";

export class CheckerTexture implements Texture {
    private even: SolidColor;
    private odd: SolidColor;

    constructor(c1: SolidColor, c2: SolidColor) {
        this.even = c1;
        this.odd = c2;
    }

    public value(_u: number, _v: number, p: Vector3, record: Record): Vector3 {
        const sines = Math.sin(100 * p.at(0)) * Math.sin(100 * p.at(1)) * Math.sin(100 * p.at(2));
        if (sines < 0) {
            return new Vector3()
        } else {
            return new Vector3(1,1,1)
        }
    }
}
