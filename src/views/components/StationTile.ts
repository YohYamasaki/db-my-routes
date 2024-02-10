import m, {ClassComponent, Vnode} from "mithril";
import {ListItem} from "./parts/listItem";
import {station} from "../../types/station";

interface StationTileAttrs {
    station: station;
    onselect: (station: station) => void;
}

export class StationTile implements ClassComponent<StationTileAttrs> {
    view({attrs}: Vnode<StationTileAttrs>) {
        return m(ListItem, m("button.text-start.w-full.h-full.px-2.py-3", {onclick: () => attrs.onselect(attrs.station)}, attrs.station.name));
    }
}