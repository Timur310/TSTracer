// src/Tracer.ts
var import_fs = require("fs");

// src/Math/Common.ts
function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}
function randomBetween(min, max) {
  return min + (max - min) * Math.random();
}
function degreeToRadian(degree) {
  return degree * Math.PI / 180;
}

// src/Math/Vector3.ts
var Vector3 = class {
  constructor(x, y, z) {
    this.EPSILON = 1e-5;
    this.components = new Float64Array(3);
    this.components[0] = x ? x : 0;
    this.components[1] = y ? y : 0;
    this.components[2] = z ? z : 0;
  }
  static multiplyVector(u, v) {
    const out = Vector3.copyVector(u);
    out.multiplyVector(v);
    return out;
  }
  static copyVector(v) {
    return new Vector3(v.at(0), v.at(1), v.at(2));
  }
  static unitVector(v) {
    const out = Vector3.copyVector(v);
    out.divideScalar(v.sqrtLength());
    return out;
  }
  static multiplyScalar(v, n) {
    const out = Vector3.copyVector(v);
    out.multiplyScalar(n);
    return out;
  }
  static divideScalar(v, n) {
    const out = Vector3.copyVector(v);
    out.divideScalar(n);
    return out;
  }
  static subVector(u, v) {
    const out = Vector3.copyVector(u);
    out.subVector(v);
    return out;
  }
  static addVector(u, v) {
    const out = Vector3.copyVector(u);
    out.addVector(v);
    return out;
  }
  static cross(u, v) {
    return new Vector3(
      u.at(1) * v.at(2) - u.at(2) * v.at(1),
      u.at(2) * v.at(0) - u.at(0) * v.at(1),
      u.at(0) * v.at(1) - u.at(1) * v.at(0)
    );
  }
  static dot(u, v) {
    return u.components[0] * v.components[0] + u.components[1] * v.components[1] + u.components[2] * v.components[2];
  }
  static randomInUnitDisk() {
    while (true) {
      const p = new Vector3(randomBetween(-1, 1), randomBetween(-1, 1), 0);
      if (p.length() >= 1)
        continue;
      return p;
    }
  }
  static vecRandomBetween(min, max) {
    return new Vector3(
      randomBetween(min, max),
      randomBetween(min, max),
      randomBetween(min, max)
    );
  }
  static randomInUnitSphere() {
    while (true) {
      const p = this.vecRandomBetween(-1, 1);
      if (p.length() >= 1)
        continue;
      return p;
    }
  }
  at(index) {
    return this.components[index];
  }
  setAt(index, value) {
    this.components[index] = value;
  }
  addScalar(value) {
    this.components[0] += value;
    this.components[1] += value;
    this.components[2] += value;
  }
  subScalar(value) {
    this.components[0] -= value;
    this.components[1] -= value;
    this.components[2] -= value;
  }
  subVector(v) {
    this.components[0] -= v.at(0);
    this.components[1] -= v.at(1);
    this.components[2] -= v.at(2);
  }
  addVector(v) {
    this.components[0] += v.at(0);
    this.components[1] += v.at(1);
    this.components[2] += v.at(2);
  }
  multiplyVector(v) {
    this.components[0] *= v.at(0);
    this.components[1] *= v.at(1);
    this.components[2] *= v.at(2);
  }
  multiplyScalar(value) {
    this.components[0] *= value;
    this.components[1] *= value;
    this.components[2] *= value;
  }
  divideVector(v) {
    this.components[0] /= v.at(0);
    this.components[1] /= v.at(1);
    this.components[2] /= v.at(2);
  }
  divideScalar(value) {
    this.components[0] /= value;
    this.components[1] /= value;
    this.components[2] /= value;
  }
  negate() {
    this.components[0] = -this.components[0];
    this.components[1] = -this.components[1];
    this.components[2] = -this.components[2];
  }
  lengthSquared() {
    return this.components[0] * this.components[0] + this.components[1] * this.components[1] + this.components[2] * this.components[2];
  }
  length() {
    return this.lengthSquared();
  }
  sqrtLength() {
    return Math.sqrt(this.length());
  }
  nearZero() {
    const s = this.EPSILON;
    return Math.abs(this.components[0]) < s && Math.abs(this.components[1]) < s && Math.abs(this.components[2]) < s;
  }
};

// src/Materials/SolidColor.ts
var SolidColor = class {
  constructor(c) {
    this.color = c ? c : new Vector3();
  }
  value(_u, _v, _p) {
    return this.color;
  }
};

// src/Materials/DiffuseLight.ts
var DiffuseLight = class {
  constructor(color) {
    this.emit = new SolidColor(color);
  }
  scatter(record) {
    return false;
  }
  emitted(record) {
    return this.emit.value(
      record.u,
      record.v,
      record.p
    );
  }
};

// src/Objects/Ray.ts
var Ray = class {
  constructor(origin, direction) {
    this.direction = direction;
    this.origin = origin;
  }
  at(t) {
    const out = new Vector3(this.Direction.at(0), this.Direction.at(1), this.Direction.at(2));
    out.multiplyScalar(t);
    out.addVector(this.origin);
    return out;
  }
  get Direction() {
    return this.direction;
  }
  get Origin() {
    return this.origin;
  }
};

// src/Materials/Lambertian.ts
var Lambertian = class {
  constructor(albedo) {
    this.albedo = albedo;
  }
  emitted(record) {
    return new Vector3(0, 0, 0);
  }
  scatter(record) {
    let scatterDir = Vector3.addVector(record.normal, Vector3.randomInUnitSphere());
    if (scatterDir.nearZero()) {
      scatterDir = record.normal;
    }
    record.scattered = new Ray(record.p, scatterDir);
    record.attenuation = this.albedo.value(
      record.u,
      record.v,
      record.p
    );
    return true;
  }
};

// src/Objects/Camera.ts
var Camera = class {
  constructor(lookFrom, lookAt, vUp, aperture, focusDist, fov, aspect_ratio) {
    this.aperture = aperture;
    this.focusDist = focusDist;
    this.theta = degreeToRadian(fov);
    this.h = Math.tan(this.theta / 2);
    this.viewport_height = 2 * this.h;
    this.viewport_width = aspect_ratio * this.viewport_height;
    this.lookAt = lookAt;
    this.lookFrom = lookFrom;
    this.vUp = vUp;
    this.w = Vector3.unitVector(Vector3.subVector(this.lookFrom, this.lookAt));
    this.u = Vector3.unitVector(Vector3.cross(this.vUp, this.w));
    this.v = Vector3.cross(this.w, this.u);
    this.origin = this.lookFrom;
    this.horizontal = Vector3.multiplyScalar(this.u, this.viewport_width * focusDist);
    this.vertical = Vector3.multiplyScalar(this.v, this.viewport_height * this.focusDist);
    const lower_left_temp = Vector3.subVector(this.origin, Vector3.divideScalar(this.horizontal, 2));
    lower_left_temp.subVector(Vector3.divideScalar(this.vertical, 2));
    lower_left_temp.subVector(Vector3.multiplyScalar(this.w, this.focusDist));
    this.lower_left_corner = lower_left_temp;
    this.lensRadius = this.aperture / 2;
  }
  getRay(u, v) {
    const rd = Vector3.randomInUnitDisk();
    rd.multiplyScalar(this.lensRadius);
    const offset = Vector3.multiplyScalar(this.u, rd.at(0));
    offset.addVector(Vector3.multiplyScalar(this.v, rd.at(1)));
    const a1 = Vector3.multiplyScalar(this.horizontal, u);
    const a2 = Vector3.multiplyScalar(this.vertical, v);
    const tempO = Vector3.addVector(this.origin, offset);
    const tempDir = Vector3.addVector(this.lower_left_corner, a1);
    tempDir.addVector(a2);
    tempDir.subVector(this.origin);
    tempDir.subVector(offset);
    return new Ray(tempO, tempDir);
  }
};

// src/Objects/HittableList.ts
var HittableList = class {
  constructor() {
    this.hittableObjects = [];
  }
  clear() {
    this.hittableObjects = [];
  }
  get getList() {
    return this.hittableObjects;
  }
  add(obj) {
    this.hittableObjects.push(obj);
  }
  hit(r, t_min, t_max, record) {
    let hit_anything = false;
    let closest_so_far = t_max;
    for (const obj of this.getList) {
      if (obj.hit(r, t_min, closest_so_far, record)) {
        hit_anything = true;
        closest_so_far = record.t;
      }
    }
    return hit_anything;
  }
};

// src/Objects/Record.ts
var Record = class {
  constructor() {
    this.p = new Vector3(0, 0, 0);
    this.normal = new Vector3(0, 0, 0);
    this.t = 0;
    this.front_face = false;
    this.u = 0;
    this.v = 0;
    this.scattered = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    this.attenuation = new Vector3(0, 0, 0);
  }
  set_front_face(r, outward_normal) {
    this.front_face = Vector3.dot(r.Direction, outward_normal) < 0;
    if (this.front_face) {
      this.normal = outward_normal;
    } else {
      outward_normal.negate();
      this.normal = outward_normal;
    }
  }
};

// src/Objects/xy_rect.ts
var xy_rect = class {
  constructor(x0, x1, y0, y1, k, mat) {
    this.mat = mat;
    this.k = k;
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
  }
  hit(r, t_min, t_max, record) {
    const t = (this.k - r.Origin.at(2)) / r.Direction.at(2);
    if (t < t_min || t > t_max) {
      return false;
    }
    const x = r.Origin.at(0) + t * r.Direction.at(0);
    const y = r.Origin.at(1) + t * r.Direction.at(1);
    if (x < this.x0 || x > this.x1 || y < this.y0 || y > this.y1) {
      return false;
    }
    record.t = t;
    record.p = r.at(t);
    const outward_normal = new Vector3(0, 0, 1);
    record.set_front_face(r, outward_normal);
    record.material = this.mat;
    return true;
  }
};

// src/Objects/xz_rect.ts
var xz_rect = class {
  constructor(x0, x1, z0, z1, k, mat) {
    this.mat = mat;
    this.k = k;
    this.x0 = x0;
    this.x1 = x1;
    this.z0 = z0;
    this.z1 = z1;
  }
  hit(r, t_min, t_max, record) {
    const t = (this.k - r.Origin.at(1)) / r.Direction.at(1);
    if (t < t_min || t > t_max) {
      return false;
    }
    const x = r.Origin.at(0) + t * r.Direction.at(0);
    const z = r.Origin.at(2) + t * r.Direction.at(2);
    if (x < this.x0 || x > this.x1 || z < this.z0 || z > this.z1) {
      return false;
    }
    record.t = t;
    record.p = r.at(t);
    const outward_normal = new Vector3(0, 1, 0);
    record.set_front_face(r, outward_normal);
    record.material = this.mat;
    return true;
  }
};

// src/Objects/yz_rect.ts
var yz_rect = class {
  constructor(z0, z1, y0, y1, k, mat) {
    this.mat = mat;
    this.k = k;
    this.z0 = z0;
    this.z1 = z1;
    this.y0 = y0;
    this.y1 = y1;
  }
  hit(r, t_min, t_max, record) {
    const t = (this.k - r.Origin.at(0)) / r.Direction.at(0);
    if (t < t_min || t > t_max) {
      return false;
    }
    const y = r.Origin.at(1) + t * r.Direction.at(1);
    const z = r.Direction.at(2) + t * r.Direction.at(2);
    if (y < this.z0 || y > this.z1 || z < this.y0 || z > this.y1) {
      return false;
    }
    record.t = t;
    record.p = r.at(t);
    const outward_normal = new Vector3(1, 0, 0);
    record.set_front_face(r, outward_normal);
    record.material = this.mat;
    return true;
  }
};

// src/Tracer.ts
var Tracer = class {
  constructor(width, height, aspectRatio) {
    this.width = width;
    this.height = height;
    this.aspectRatio = aspectRatio;
  }
  rayColor(r, scene, depth, record) {
    if (depth <= 0)
      return new Vector3(0, 0, 0);
    if (!scene.hit(r, 1e-3, Number.POSITIVE_INFINITY, record)) {
      return new Vector3(0, 0, 0);
    }
    const emitted = record.material.emitted(record);
    if (!record.material.scatter(record))
      return emitted;
    const currColor = Vector3.multiplyVector(record.attenuation, this.rayColor(record.scattered, scene, depth - 1, record));
    currColor.addVector(emitted);
    return currColor;
  }
  writeColor(pixel, sample) {
    const scale = 1 / sample;
    let r = pixel.at(0);
    let g = pixel.at(1);
    let b = pixel.at(2);
    r = Math.sqrt(scale * r);
    g = Math.sqrt(scale * g);
    b = Math.sqrt(scale * b);
    return `${255 * clamp(r, 0, 0.999)} ${255 * clamp(g, 0, 0.999)} ${255 * clamp(b, 0, 0.999)} 
`;
  }
  setupScene(scene) {
    scene.add(new yz_rect(0, 555, 0, 555, 555, new Lambertian(new SolidColor(new Vector3(0.12, 0.45, 0.15)))));
    scene.add(new yz_rect(0, 555, 0, 555, 0, new Lambertian(new SolidColor(new Vector3(0.65, 0.05, 0.05)))));
    scene.add(new xz_rect(0, 555, 0, 555, 0, new Lambertian(new SolidColor(new Vector3(0.73, 0.73, 0.73)))));
    scene.add(new xz_rect(0, 555, 0, 555, 555, new Lambertian(new SolidColor(new Vector3(0.73, 0.73, 0.73)))));
    scene.add(new xy_rect(0, 555, 0, 555, 555, new Lambertian(new SolidColor(new Vector3(0.73, 0.73, 0.73)))));
    scene.add(new xz_rect(213, 343, 227, 332, 554, new DiffuseLight(new Vector3(15, 15, 15))));
  }
  async renderImage() {
    const max_depth = 10;
    const max_samples = 50;
    const lookfrom = new Vector3(278, 278, -800);
    const lookat = new Vector3(278, 278, 0);
    const vUp = new Vector3(0, 1, 0);
    const dist_to_focus = 1.5;
    const aperture = 1e-3;
    const camera = new Camera(lookfrom, lookat, vUp, aperture, dist_to_focus, 40, this.aspectRatio);
    const scene = new HittableList();
    this.setupScene(scene);
    const record = new Record();
    let img = `P3
${this.width} ${this.height} 
255
`;
    for (let j = this.height - 1; j >= 0; --j) {
      console.log(j);
      for (let i = 0; i < this.width; ++i) {
        const finalColor = new Vector3(0, 0, 0);
        for (let s = 0; s < max_samples; ++s) {
          const u = (i + Math.random()) / (this.width - 1);
          const v = (j + Math.random()) / (this.height - 1);
          const r = camera.getRay(u, v);
          finalColor.addVector(this.rayColor(r, scene, max_depth, record));
        }
        img += this.writeColor(finalColor, max_samples);
      }
      console.clear();
    }
    try {
      (0, import_fs.writeFileSync)("image.ppm", img);
      console.log("Image rendered");
    } catch (error) {
      console.log(error);
    }
  }
};

// src/test.ts
function start() {
  const tracer = new Tracer(256, 256, 1);
  tracer.renderImage();
}
start();
