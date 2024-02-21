import m from "mithril";
import {journey} from "../types/journey";
import {parseDatetime} from "../utils/parseDatetime";

interface ITripListModel {
    journeys: journey[],
    fetchJourneys: () => void,
    toggleNational: (useNational: boolean) => void,
    toggleType: (isArrival: boolean) => void
}

export class JourneyListModel implements ITripListModel {
    private _journeys: journey[] = [];
    private _departureStationId: string;
    private _arrivalStationId: string;
    private _useNational: boolean;
    private _isArrival: boolean;

    constructor(departureStationId: string, arrivalStationId: string, includeNational: boolean) {
        this._departureStationId = departureStationId;
        this._arrivalStationId = arrivalStationId;
        this._useNational = includeNational;
        this._isArrival = false;
    }

    get journeys() {
        return this._journeys;
    }

    fetchJourneys() {
        let params = new URLSearchParams({
            from: this._departureStationId,
            to: this._arrivalStationId,
            nationalExpress: this._useNational ? "true" : "false",
            national: this._useNational ? "true" : "false",
            results: "5",
        });
        // set arrival or departure
        if (this._isArrival) {
            params.set("arrival", parseDatetime(Date.now()));
        } else {
            params.set("departure", parseDatetime(Date.now()));
        }

        let url = `https://v5.db.transport.rest/journeys?${params.toString()}`;
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

    toggleNational(useNational: boolean) {
        this._useNational = useNational;
    }

    toggleType(isArrival: boolean) {
        this._isArrival = isArrival;
    }
}