import m from "mithril";
import "tailwindcss/tailwind.css";
import "./App.css";

import {Feed} from "./views/pages/Feed";
import {FeedList} from "./views/pages/FeedList";

const mountNode = document.querySelector("#app");
if (mountNode) {
  m.route(mountNode, "/feed", {
    "/feed": Feed,
    "/feed-list": FeedList,
  });
}
