import {station} from "../types/station";
import {route} from "../types/route";

interface IAddRouteModel {
    departure: station | undefined,
    arrival: station | undefined,
    addRoute: () => void
}

export class AddRouteModel implements IAddRouteModel {
    private _departure: station | undefined;
    private _arrival: station | undefined;

    get departure() {
        return this._departure;

    }

    get arrival() {
        return this._arrival;
    }

    set departure(departure: station | undefined) {
        this._departure = departure ? {...departure} : undefined;
    }

    set arrival(arrival: station | undefined) {
        this._arrival = arrival ? {...arrival} : undefined;
    }

    addRoute() {
        if (!this._departure || !this._arrival) return;

        const route: route = {
            departure: this._departure,
            arrival: this._arrival
        };
        let routes: route[] = [];
        try {
            // if already routes exists, add new route
            const routesJson = localStorage.getItem("routes");
            if (routesJson) routes = JSON.parse(routesJson) as route[];
            routes.push(route);
            // set updated routes array to local storage
            localStorage.setItem("routes", JSON.stringify(routes));
        } catch (e) {
            console.error(e);
        }
    }
}