import m, {ClassComponent, Vnode} from "mithril";

export class ListItem implements ClassComponent {
    view({children}: Vnode) {
        return m("div.border-t-2.border-b-2.border-gray-800.bg-gray-900.mb-2", children);
    }
}