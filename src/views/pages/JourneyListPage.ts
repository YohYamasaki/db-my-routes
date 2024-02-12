import m, {ClassComponent, Children, Vnode} from "mithril";
import {JourneyListModel} from "../../models/JourneyListModel";
import {JourneyTile} from "../components/JourneyTile";
import {Header} from "../components/Header";
import {parseDatetime} from "../../utils/parseDatetime";
import {ToggleSwitch} from "../components/parts/ToggleSwitch";

interface JourneyListPageAttrs {
    departureId: string,
    departureName: string,
    arrivalId: string,
    arrivalName: string,
}

export class JourneyListPage implements ClassComponent<JourneyListPageAttrs> {
    private model: JourneyListModel | undefined;

    oninit({attrs}: Vnode<JourneyListPageAttrs>) {
        this.model = new JourneyListModel(attrs.departureId, attrs.arrivalId, false);
    }

    view({attrs}: Vnode<JourneyListPageAttrs>): void | Children {
        return m("div.w-full",
            [
                m(Header, {title: "Journey List", showButton: false}),
                m(".flex.gap-4.justify-between.px-2.mt-2", [
                    // Update data
                    m("button.bg-gray-800.px-4.py-2.border.rounded-md.font-bold.hover:opacity-60",
                        {
                            onclick: () => {
                                this.model?.fetchJourneys();
                            },
                        },
                        "Update Data"),
                    // Toggle National trains
                    m(ToggleSwitch, {
                        onChange: (useNational: boolean) => this.model?.toggleNational(useNational),
                        label: "Include ICE/IC"
                    }),
                ]),
                m("h2.text-lg.font-bold", `${attrs.departureName} -> ${attrs.arrivalName}`),
                m("p", `Search after ${parseDatetime(Date.now())}`),
                m("div", this.model?.journeys.map(journey => m(JourneyTile, {
                    arrivalStationName: attrs.arrivalName,
                    departureStationName: attrs.departureName,
                    journey: journey
                }))),
            ]
        );
    }
}


