import m from "mithril";
import "tailwindcss/tailwind.css";
import "./App.css";
import {MainPage} from "./views/pages/MainPage";

const mountNode = document.querySelector("#app");
if (mountNode) {
  m.route(mountNode, "/", {
    "/": MainPage,
  });
}
