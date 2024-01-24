import m, {ClassComponent, Vnode, Children} from "mithril";

interface MainPageAttrs {
  feedUrl: string;
  removeAction?: Function;
}

export class MainPage implements ClassComponent<MainPageAttrs> {
  oninit({attrs}: Vnode<MainPageAttrs>) {
    console.log("main page oninit");
  }

  view({attrs}: Vnode<MainPageAttrs>): void | Children {
    return m("div", "test");
  }
}
