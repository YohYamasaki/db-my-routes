import m, { ClassComponent, Vnode } from "mithril";
import { journey } from "../../types/journey";
import { parseDatetime } from "../../utils/parseDatetime";
import { ListItem } from "./parts/ListItem";

interface JourneyTileAttr {
  arrivalStationName: string;
  departureStationName: string;
  journey: journey;
}

export class JourneyTile implements ClassComponent<JourneyTileAttr> {
  view({ attrs }: Vnode<JourneyTileAttr>) {
    const journey = attrs.journey;
    const firstLeg = journey.legs[0];
    const lastLeg = journey.legs[journey.legs.length - 1];
    const isCancelled = journey.legs.some((leg) => leg.cancelled);

    const handleCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      //   TODO: add notification here after implementing toast
      alert("Copied");
    };

    return m(ListItem, [
      m("div.px-2.py-3.w-full", [
        // station name
        m(
          "p",
          `${attrs.departureStationName} (pt. ${firstLeg.departurePlatform}) -> ${attrs.arrivalStationName} (pt. ${lastLeg.arrivalPlatform})`
        ),
        m("div.flex.w-full.justify-between", [
          m("div", [
            // cancelled
            isCancelled && m("p.text-red-500.font-bold", `Train Cancelled`),
            // original time
            m(
              "p.font-bold.text-lg.text-gray-500",
              `${parseDatetime(firstLeg.plannedDeparture)} -> ${parseDatetime(
                firstLeg.plannedArrival
              )}`
            ),

            // actual time
            m("p.font-bold.text-lg", [
              m(
                "span",
                {
                  class: firstLeg.departureDelay!
                    ? "text-red-600"
                    : "text-green-300",
                },
                `${parseDatetime(firstLeg.departure)}`
              ),
              m("span.opacity-0", " -> "),
              m(
                "span",
                {
                  class: lastLeg.arrivalDelay!
                    ? "text-red-600"
                    : "text-green-300",
                },
                `${parseDatetime(lastLeg.arrival)}`
              ),
            ]),
            // train name
            journey.legs.map(
              (leg) =>
                leg.line &&
                m(
                  "span.text-sm.bg-gray-200.text-gray-900.rounded-sm.px-1.mr-2",
                  `${leg.line.name}`
                )
            ),
          ]),
          m("div.flex.flex-col.justify-between.items-end", [
            // transfer number
            m("p.text-sm", `${journey.legs.length - 1} transfer`),
            // copy button
            m(
              "button",
              {
                onclick: () =>
                  handleCopy(
                    `${attrs.departureStationName} (pt. ${
                      firstLeg.departurePlatform
                    }) -> ${attrs.arrivalStationName} (pt. ${
                      lastLeg.arrivalPlatform
                    })\n${parseDatetime(firstLeg.departure)} -> ${parseDatetime(
                      lastLeg.arrival
                    )}`
                  ),
              },
              m("ion-icon.font-bold.text-xl", { name: "clipboard-outline" })
            ),
          ]),
        ]),
      ]),
    ]);
  }
}
