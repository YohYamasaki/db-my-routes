import m from "mithril";
import {journey} from "../types/journey";

interface ITripListModel {
    journeys: journey[],
    fetchJourneys: () => void
}

export class JourneyListModel implements ITripListModel {
    private _journeys: journey[] = [];
    private _departureStationId: string;
    private _arrivalStationId: string;
    trainName: string = "";

    constructor(departureStationId: string, arrivalStationId: string) {
        this._departureStationId = departureStationId;
        this._arrivalStationId = arrivalStationId;
    }

    get journeys() {
        return this._journeys;
    }

    fetchJourneys() {
        let params = new URLSearchParams({
            from: this._departureStationId,
            to: this._arrivalStationId
        }).toString();
        let url = `https://v5.db.transport.rest/journeys?${params}`;
        fetch(url).then(res => {
            if (!res.ok) throw Error(`${res.status} ${res.statusText}`);
            return res.json();
        })
            .then(data => {
                console.log(data);
                this._journeys = data["journeys"] as journey[];
                m.redraw();
            })
            .catch(err => console.error(err));
    }
}