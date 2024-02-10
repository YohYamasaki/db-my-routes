import m, {Vnode, ClassComponent} from "mithril";

interface HeaderAttrs {
    title: string,
    showButton?: boolean,
    buttonText?: string,
    onButtonClick?: () => void
}

export class Header implements ClassComponent<HeaderAttrs> {
    view({attrs}: Vnode<HeaderAttrs>) {
        return m("div.flex.justify-center.items-center.w-full.h-11.bg-red-800", [
            m("h1.text-xl.font-bold", attrs.title),
            attrs.showButton &&
            m("button.ml-auto", {onclick: attrs.onButtonClick}, attrs.buttonText)
        ])
    }
}