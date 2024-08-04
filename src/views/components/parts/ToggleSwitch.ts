import m, {ClassComponent, Vnode} from "mithril";

interface ToggleSwitchAttrs {
  onChange: (useNational: boolean) => void;
  label: string;
}

export class ToggleSwitch implements ClassComponent<ToggleSwitchAttrs> {
  view({attrs}: Vnode<ToggleSwitchAttrs>) {
    return m("div.inline-flex.items-center.gap-2.my-3.mr-3", [
      m("label.inline-flex.items-center.cursor-pointer", [
        m("input.sr-only.peer", {
          type: "checkbox",
          onclick: (e: any) => attrs.onChange(e.target.checked),
        }),
        m("div", {
          class:
            "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600",
        }),
        m("span", {class: "mx-1 text-sm font-medium text"}, attrs.label),
      ]),
    ]);
  }
}
