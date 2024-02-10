import {station} from "../types/station";

interface IMyRoutesModel {
    searchQuery: string,
    stationList: station[],
    searchStation: (cb?: () => void) => void
}

export class StationSearchModel implements IMyRoutesModel {
    private _stationList: station[] = [];
    private _searchQuery: string = "";

    set searchQuery(query: string) {
        this._searchQuery = query;
    }

    get stationList() {
        return this._stationList;
    }

    searchStation(cb?: () => void): void {
        const url: string = "https://v6.db.transport.rest/stations?";
        const params = new URLSearchParams({
            query: this._searchQuery,
            limit: "5",
            fuzzy: "true"
        });
        // empty station list
        this._stationList = [];
        // fetch station data from the query text
        fetch(url + params)
            .then(res => res.json())
            .then(data => {
                // iterate all object inside the data
                Object.values(data).forEach((val: any) => {
                    // add data
                    const station: station = {id: val.id, name: val.name};
                    this._stationList.push(station);
                });
            })
            .finally(cb);
    }
}