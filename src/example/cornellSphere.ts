import { Tracer } from "../Tracer";
import scene from "./CornellSphere.json"

function start() {
    const tracer = new Tracer(scene)
    tracer.renderImage();
}

start()