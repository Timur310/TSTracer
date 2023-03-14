
# Typescript CPU raytracer

A refactored version of my first ever atempt at building a raytracer in JS, most refactors are in folder and file structure, everything else is the original code. I always wanted to dive myself into computer graphic, so this was a great challenge to begin with. All the inspiration and help comes from the famous raytracing in one weekend series. The raytracer itself is not the most efficient, there is no ray acceleration implemented (BVH - KDtree - Octree) and its running in nodejs so that doesn't help either. 
## Features

- Basic shapes (plane - sphere)
- multiple materials
- scene parser to play around easier
- slowest on the market


## Run Locally

Clone the project

```bash
  git clone https://github.com/Timur310/TSTracer.git
```

Go to the project directory

```bash
  cd TSTracer
```

Install dependencies

```bash
  npm install
```

build example scene

```bash
  npm run build && node example.js
```
This will render the example cornellSphere scene from the example folder, the scene itself is a json file structured with settings, camera and scene objects, there is a parser file that will setup the scene ready for rendering, after that a .PPM file will be outputted with the final image


## Screenshots

![App Screenshot](https://github.com/Timur310/TSTracer/blob/main/src/example/image.png)


## Acknowledgements

 - [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html)

