import m from "mithril";
import "tailwindcss/tailwind.css";
import "./App.css";
import {JourneyListPage} from "./views/pages/JourneyListPage";
import {StationSearchPage} from "./views/pages/StationSearchPage";
import {AddRoutePage} from "./views/pages/AddRoutePage";
import {RouteListPage} from "./views/pages/RouteListPage";

const mountNode = document.querySelector("#app");
if (mountNode) {
    m.route(mountNode, "/", {
        "/": RouteListPage,
        "/add-route": AddRoutePage,
        "/station-search": StationSearchPage,
        "/journey-list/:departureName/:departureId/:arrivalName/:arrivalId": JourneyListPage,
    });
}
