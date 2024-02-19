import m, {ClassComponent, Vnode} from "mithril";

interface ListItemAttrs {
    action?: () => void,
    actionIcon?: string
}

export class ListItem implements ClassComponent<ListItemAttrs> {
    view({attrs, children}: Vnode<ListItemAttrs>) {
        return m("div", [
            m("div.flex.justify-between.border-t-2.border-b-2.border-gray-800.bg-gray-900.mb-2.pr-2", [
                children,
                attrs.action && m("button", {onclick: attrs.action}, m(
                    "ion-icon.font-bold.text-xl", {name: attrs.actionIcon}
                ))
            ]),
        ]);
    }
}