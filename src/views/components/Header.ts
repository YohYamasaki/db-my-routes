import m, { ClassComponent, Vnode } from "mithril";
import { BackButton } from "./parts/BackButton";
// @ts-ignore
// import mainIcon from "../../images/icon-192x192.png";

interface HeaderAttrs {
  title: string;
  showBackButton?: boolean;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

export class Header implements ClassComponent<HeaderAttrs> {
  view({ attrs }: Vnode<HeaderAttrs>) {
    return m(
      "div.relative.flex.justify-center.items-center.w-full.h-11.bg-red-800",
      [
        attrs.showBackButton && m(BackButton),
        m("h1.text-xl.font-bold", attrs.title),
        attrs.showButton &&
          m(
            "button.absolute.right-2.flex.items-center",
            { onclick: attrs.onButtonClick },
            attrs.buttonText
          ),
      ]
    );
  }
}
