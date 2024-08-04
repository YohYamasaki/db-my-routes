import { route } from "../types/route";

interface IRouteListModel {
  getRouteList: () => void;
}

export class RouteListModel implements IRouteListModel {
  private _routes: route[] = [];

  get routes() {
    return this._routes;
  }

  deleteRoute(target: number) {
    if (target < 0 || target >= this._routes.length) {
      console.error("invalid target number");
    }
    try {
      this._routes.splice(target, 1);
      const updatedJson = JSON.stringify(this._routes);
      localStorage.setItem("routes", updatedJson);
    } catch (e) {
      console.error(e);
    }
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
