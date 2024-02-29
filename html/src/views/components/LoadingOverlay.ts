import m, { ClassComponent, Vnode } from "mithril";

interface LoadingOverlayAttrs {
  isShow: boolean;
}

export class LoadingOverlay implements ClassComponent<LoadingOverlayAttrs> {
  view({ attrs }: Vnode<LoadingOverlayAttrs>) {
    if (!attrs.isShow) return;
    return m(
      "div.w-screen.h-screen.fixed.z-10",
      m("div.w-screen.h-screen.fixed.bg-black.opacity-30"),
      m("div.lds-ellipsis.fixed.inset-0.m-auto", [m(""), m(""), m(""), m("")])
    );
    // loading animation
  }
}
