import m, {ClassComponent, Children, Vnode} from "mithril";
import {Header} from "../components/Header";
import {StationSearchModel} from "../../models/StationSearchModel";
import {StationTile} from "../components/StationTile";
import {station} from "../../types/station";

interface StationSearchPageAttrs {
    onselect: (station: station) => void;
}

export class StationSearchPage implements ClassComponent<StationSearchPageAttrs> {
    private model = new StationSearchModel();

    private handleInputChange = (e: any) => {
        this.model.searchQuery = e.target.value;
    };

    private handleSearchSubmit = (e: any) => {
        e.preventDefault();
        this.model.searchStation(m.redraw);
    };

    view({attrs}: Vnode<StationSearchPageAttrs>): void | Children {
        return m("div.w-full.text-gray-50",
            [
                m(Header, {title: "Station Search", showButton: false}),
                m("form.flex.py-4.mx-2", {
                    onsubmit: this.handleSearchSubmit
                }, [
                    m("input.text-gray-900.w-full.h-10.px-2", {
                        onchange: this.handleInputChange,
                        placeholder: "Search station name"
                    }),
                    m("button.border.px-3.h-10", {type: "submit"}, "Search")
                ]),
                m("div", [
                    m("h2.text-lg.font-bold.px-2", "Search Results"),
                    m("div.pt-4", [
                        this.model.stationList.length
                            ? this.model.stationList.map(station => {
                                return m(StationTile, {
                                    station: station,
                                    onselect: attrs.onselect
                                });
                            })
                            : m("p.text-gray-500.text-center", "No results")
                    ])
                ])
            ]
        );
    }
}


