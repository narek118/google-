import path from "path";
import glob from "glob";

export function init(api) {

    const models = glob.sync(path.join(process.cwd(),'/**/*.model.js'));
    const routes = glob.sync(path.join(process.cwd(),'/**/*.routers.js'));

    models.forEach(model => require(model));
    routes.forEach(route => require(route).init(api));

    return api;
}