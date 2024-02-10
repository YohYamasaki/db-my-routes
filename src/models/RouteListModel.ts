import {route} from "../types/route";

interface IRouteListModel {
    getRouteList: () => void;
}

export class RouteListModel implements IRouteListModel {
    private _routes: route[] = [];

    get routes() {
        return this._routes;
    }

    getRouteList() {
        try {
            const routesJson = localStorage.getItem("routes");
            if (!routesJson) return;
            this._routes = JSON.parse(routesJson) as route[];
        } catch (e) {
            console.error(e);
        }
    }
}