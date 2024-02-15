import m, {ClassComponent} from "mithril";

export class BackButton implements ClassComponent {
    view() {
        return m("button.absolute.left-0.flex.items-center",
            {
                onclick: () => window.history.back()
            },
            m("ion-icon.font-bold.text-3xl", {name: "chevron-back-outline"}
            ),
        );
    }
}