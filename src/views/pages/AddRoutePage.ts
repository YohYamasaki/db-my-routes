import m, {ClassComponent} from "mithril";
import {Header} from "../components/Header";
import {Modal} from "../components/Modal";
import {StationSearchPage} from "./StationSearchPage";
import {station} from "../../types/station";
import {AddRouteModel} from "../../models/AddRouteModel";

interface AddRoutePageAttrs {
}

export class AddRoutePage implements ClassComponent<AddRoutePageAttrs> {
    private model = new AddRouteModel();
    private openModal = (modalId: string) => {
        const dialogEl = document?.querySelector(`dialog#${modalId}`) as HTMLDialogElement;
        if (!dialogEl) return;
        !dialogEl.open ? dialogEl.showModal() : dialogEl.close();
    };

    private closeModal = (modalId: string) => {
        const dialogEl = document?.querySelector(`dialog#${modalId}`) as HTMLDialogElement;
        dialogEl.close();
    };

    private handleSelectStation = (station: station, modalId: "departure" | "arrival") => {
        if (modalId === "departure") {
            this.model.departure = station;
        } else if (modalId === "arrival") {
            this.model.arrival = station;
        }
        this.closeModal(modalId);
    };

    view() {
        return m("div.w-full", [
            m(Header, {title: "Station Search", showBackButton: true}),
            m("div.pt-3.flex.flex-col.gap-3", [
                // departure selector
                m("button.block.w-full.bg-gray-800.px-2.py-3.text-start",
                    {onclick: () => this.openModal("departure")},
                    this.model.departure
                        ? this.model.departure.name
                        : "Select Departure Station"
                ),
                m("p.text-center", "↓"),
                // arrival selector
                m("button.block.w-full.bg-gray-800.px-2.py-3.text-start", {onclick: () => this.openModal("arrival")},
                    this.model.arrival
                        ? this.model.arrival.name
                        : "Select Arrival Station"
                ),
                // add route
                m("button.block.bg-red-800.px-4.py-3.m-auto.border.rounded-sm.font-bold.w-1/2.hover:opacity-60", {onclick: () => this.model.addRoute()}, "Add Route"),

                // modal for departure station selection
                m(Modal, {
                        id: "departure",
                    },
                    m(StationSearchPage,
                        {onselect: (station: station) => this.handleSelectStation(station, "departure")}
                    )
                ),
                // modal for arrival station selection
                m(Modal, {
                        id: "arrival",
                    },
                    m(StationSearchPage,
                        {onselect: (station: station) => this.handleSelectStation(station, "arrival")}
                    )
                ),
            ]),
        ]);
    }
}