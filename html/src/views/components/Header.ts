import m, {Vnode, ClassComponent} from "mithril";
import {BackButton} from "./parts/BackButton";
// @ts-ignore
import mainIcon from "../../images/icon-192x192.png";

interface HeaderAttrs {
    title: string,
    showBackButton?: boolean,
    showButton?: boolean,
    buttonText?: string,
    onButtonClick?: () => void
}

export class Header implements ClassComponent<HeaderAttrs> {
    view({attrs}: Vnode<HeaderAttrs>) {
        return m("div.relative.flex.justify-center.items-center.w-full.h-11.bg-red-800", [
            attrs.showBackButton && m(BackButton),
            m("img.w-8.h-8.pr-2", {src: mainIcon}),
            m("h1.text-xl.font-bold", attrs.title),
            attrs.showButton &&
            m("button.ml-auto", {onclick: attrs.onButtonClick}, attrs.buttonText)
        ]);
    }
}