import { SceneData } from "../test";
import { Lambertian } from "./Materials/Lambertian";
import { ratio } from "./Math/Common";
import { Vector3 } from "./Math/Vector3";
import { Camera } from "./Objects/Camera";
import { HittableList } from "./Objects/HittableList";
import { Sphere } from "./Objects/Sphere";
import { SolidColor, Texture } from "./Materials/SolidColor";
import { Dielectric } from "./Materials/Dielectric";
import { Metal } from "./Materials/Metal";
import { yz_rect } from "./Objects/yz_rect";
import { DiffuseLight } from "./Materials/DiffuseLight";
import { xy_rect } from "./Objects/xy_rect";
import { xz_rect } from "./Objects/xz_rect";

export function parseCamera(scene: SceneData): Camera {
    const lookfrom = new Vector3(scene.camera.lookFrom.x, scene.camera.lookFrom.y, scene.camera.lookFrom.z);
    const lookat = new Vector3(scene.camera.lookAt.x, scene.camera.lookAt.y, scene.camera.lookAt.z);
    const vUp = new Vector3(scene.camera.vUp.x, scene.camera.vUp.y, scene.camera.vUp.z);
    const dist_to_focus = scene.camera.focusDistance;
    const aperture = scene.camera.aperture;
    const fov = scene.camera.fov
    const aspectRatio = scene.settings.aspectRatio

    return new Camera(lookfrom, lookat, vUp, aperture, dist_to_focus, fov, aspectRatio);
}

export function parseScene(scene: SceneData): HittableList {
    const world = new HittableList();
    for (const key in scene.scene) {
        let object = scene.scene[key] as any
        switch (object.type) {
            case "Sphere":
                const matTypeSphere = object.material.type;
                let matSphere;
                if (matTypeSphere === 'lambertian') {
                    matSphere = new Lambertian(new SolidColor(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z)))
                }
                if (matTypeSphere === "dielectric") {
                    matSphere = new Dielectric(object.material.value)
                }
                if (matTypeSphere === "diffuseLight") {
                    matSphere = new DiffuseLight(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z))
                }
                if (matTypeSphere === "metal") {
                    matSphere = new Metal(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z), object.material.fuzzines)
                }
                const sphere = new Sphere(new Vector3(object.position.x, object.position.y, object.position.z), object.radius, matSphere)
                world.add(sphere)
                break;
            case "yz_rect":
                const matTypeYZPlane = object.material.type;
                let matPlaneYZ;
                if (matTypeYZPlane === 'lambertian') {
                    matPlaneYZ = new Lambertian(new SolidColor(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z)))
                }
                if (matTypeYZPlane === "dielectric") {
                    matPlaneYZ = new Dielectric(object.material.value)
                }
                if (matTypeYZPlane === "diffuseLight") {
                    matPlaneYZ = new DiffuseLight(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z))
                }
                if (matTypeYZPlane === "metal") {
                    matPlaneYZ = new Metal(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z), object.material.fuzzines)
                }
                const yz_plane = new yz_rect(object.position.z0, object.position.z1, object.position.y0, object.position.y1, object.position.k, matPlaneYZ)
                world.add(yz_plane);
                break;
            case "xz_rect":
                const matTypeXZPlane = object.material.type;
                let matPlaneXZ;
                if (matTypeXZPlane === 'lambertian') {
                    matPlaneXZ = new Lambertian(new SolidColor(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z)))
                }
                if (matTypeXZPlane === "dielectric") {
                    matPlaneXZ = new Dielectric(object.material.value)
                }
                if (matTypeXZPlane === "diffuseLight") {
                    matPlaneXZ = new DiffuseLight(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z))
                }
                if (matTypeXZPlane === "metal") {
                    matPlaneXZ = new Metal(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z), object.material.fuzzines)
                }
                const xz_plane = new xz_rect(object.position.z0, object.position.z1, object.position.y0, object.position.y1, object.position.k, matPlaneXZ)
                world.add(xz_plane)
                break;
            case "xy_rect":
                const matTypeXYPlane = object.material.type;
                let matPlaneXY;
                if (matTypeXYPlane === 'lambertian') {
                    matPlaneXY = new Lambertian(new SolidColor(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z)))
                }
                if (matTypeXYPlane === "dielectric") {
                    matPlaneXY = new Dielectric(object.material.value)
                }
                if (matTypeXYPlane === "diffuseLight") {
                    matPlaneXY = new DiffuseLight(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z))
                }
                if (matTypeXYPlane === "metal") {
                    matPlaneXY = new Metal(new Vector3(object.material.texture.color.x, object.material.texture.color.y, object.material.texture.color.z), object.material.fuzzines)
                }
                const xy_plane = new xy_rect(object.position.z0, object.position.z1, object.position.y0, object.position.y1, object.position.k, matPlaneXY)
                world.add(xy_plane)
                break;
        }
    }
    return world;
}