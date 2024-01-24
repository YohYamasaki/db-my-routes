import m from "mithril";
import "tailwindcss/tailwind.css";
import "./App.css";

const mountNode = document.querySelector("#app");
if (mountNode) {
  m.route(mountNode, "/feed", {
    "/feed": Feed,
    "/feed-list": FeedList,
  });
}
