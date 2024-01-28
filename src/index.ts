import m from "mithril";
import "tailwindcss/tailwind.css";
import "./App.css";
import {MainPage} from "./views/pages/MainPage";
import {TripListPage} from "./views/pages/TripListPage";

const mountNode = document.querySelector("#app");
if (mountNode) {
	m.route(mountNode, "/", {
		"/": TripListPage,
	});
}
