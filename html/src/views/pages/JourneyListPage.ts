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
        return m("div.w-full.min-h-screen",
            [
                m(Header, {title: "Journey List", showBackButton: true}),
                m("h2.text-2xl.font-bold.mt-2", `${attrs.departureName} -> ${attrs.arrivalName}`),
                m("p", `Search after ${parseDatetime(Date.now())}`),
                // Toggle National trains
                m(ToggleSwitch, {
                    onChange: (useNational: boolean) => this.model?.toggleNational(useNational),
                    label: "Include ICE/IC"
                }),
                // Toggle departure or arrival
                m(ToggleSwitch, {
                    onChange: (isArrival: boolean) => this.model?.toggleType(isArrival),
                    label: "Arrival (After current time)"
                }),
                // Update data
                m("button.block.bg-red-800.px-4.py-2.m-auto.border.rounded-sm.font-bold.w-1/3.hover:opacity-60",
                    {
                        onclick: () => {
                            this.model?.fetchJourneys();
                        },
                    },
                    "Update Data"),
                // Journey list
                m("div.py-4", this.model?.journeys.map(journey => m(JourneyTile, {
                    arrivalStationName: attrs.arrivalName,
                    departureStationName: attrs.departureName,
                    journey: journey
                }))),

            ]
        );
    }
}


