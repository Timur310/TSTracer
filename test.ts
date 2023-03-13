import { Tracer } from "./src/Tracer";
import scene from "./src/example/CornellSphere.json"

function start() {
    const tracer = new Tracer(scene)
    tracer.renderImage();
}

start()