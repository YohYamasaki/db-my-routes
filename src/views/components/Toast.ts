import m, { ClassComponent } from "mithril";

export class Toast implements ClassComponent {
  view() {
    return m("div.fixed.top-0.bg-white.w-1/2.h-4.", [
      m("p.text-black", "test")
    ]);
  }
}
