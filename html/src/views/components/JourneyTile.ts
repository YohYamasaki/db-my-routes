import m, {ClassComponent, Vnode} from "mithril";
import {journey} from "../../types/journey";
import {parseDatetime} from "../../utils/parseDatetime";
import {ListItem} from "./parts/ListItem";
import {createOriginalTime} from "../../utils/createOriginalTime";

interface JourneyTileAttr {
    arrivalStationName: string,
    departureStationName: string,
    journey: journey
}

export class JourneyTile implements ClassComponent<JourneyTileAttr> {
    view({attrs}: Vnode<JourneyTileAttr>) {
        const journey = attrs.journey;
        const firstLeg = journey.legs[0];
        const lastLeg = journey.legs[journey.legs.length - 1];
        const isCancelled = journey.legs.some(leg => leg.cancelled);

        return m(ListItem, [
            m("div.px-2.py-3.w-full", [
                // station name
                m("p", `${attrs.departureStationName} (pt. ${firstLeg.departurePlatform}) -> ${attrs.arrivalStationName} (pt. ${lastLeg.arrivalPlatform})`),
                m("div.flex.w-full.justify-between", [
                    m("div", [
                        // cancelled
                        isCancelled && m("p", `Train Cancelled`),
                        // original time
                        m("p.font-bold.text-lg.text-gray-500", `${createOriginalTime(firstLeg.departure, firstLeg.departureDelay!)} -> ${createOriginalTime(firstLeg.arrival, firstLeg.arrivalDelay!)}`),

                        // actual time
                        m("p.font-bold.text-lg", [
                            m("span", {class: (firstLeg.departureDelay! ? "text-red-600" : "text-green-300")}, `${parseDatetime(firstLeg.departure)}`),
                            m("span.opacity-0", " -> "),
                            m("span", {class: (lastLeg.arrivalDelay! ? "text-red-600" : "text-green-300")}, ` ${parseDatetime(lastLeg.arrival)}`)
                        ]),
                        // delay
                        // m("p", `Delay: ${firstLeg.departureDelay} -> ${lastLeg.arrivalDelay}`),
                        // train name
                        journey.legs.map(leg =>
                            leg.line
                            && m("span.text-sm.bg-gray-200.text-gray-900.rounded-sm.px-1.mr-2", `${leg.line.name}`)
                        )
                    ]),
                    // transfer number
                    m("p.text-sm", `${journey.legs.length - 1} transfer`)
                ])
            ]),
        ]);
    }
}