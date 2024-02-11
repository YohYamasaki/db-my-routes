import m, {ClassComponent, Vnode} from "mithril";

interface ToggleSwitchAttrs {
    onChange: (useNational: boolean) => void;
    label: string;
}

export class ToggleSwitch implements ClassComponent<ToggleSwitchAttrs> {

    view({attrs}: Vnode<ToggleSwitchAttrs>) {
        return m("div.flex.items-center.gap-2.my-3", [
            m("input.tgl.tgl-flat#switch", {
                type: "checkbox",
                onclick: (e: any) => attrs.onChange(e.target.checked)
            }),
            m("label.tgl-btn", {for: "switch"}),
            m("label", attrs.label)
        ]);

    }
}
