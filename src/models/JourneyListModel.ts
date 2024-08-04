import { journey } from "../types/journey";
import { parseDatetime } from "../utils/parseDatetime";

interface ITripListModel {
  journeys: journey[];
  searchTime: string;
  fetchJourneys: () => void;
  toggleNational: (useNational: boolean) => void;
  toggleType: (isArrival: boolean) => void;
}

export class JourneyListModel implements ITripListModel {
  private _journeys: journey[] = [];
  private _departureStationId: string;
  private _arrivalStationId: string;
  private _useNational: boolean;
  private _isArrival: boolean;
  private _searchTime: string;

  constructor(
    departureStationId: string,
    arrivalStationId: string,
    includeNational: boolean
  ) {
    if (!departureStationId.match(/\d/) || !arrivalStationId.match(/\d/)) {
      throw new Error("provide valid station id");
    }
    this._departureStationId = departureStationId;
    this._arrivalStationId = arrivalStationId;
    this._useNational = includeNational;
    this._isArrival = false;
    this._searchTime = parseDatetime(Date.now());
  }

  get journeys() {
    return this._journeys;
  }

  get searchTime() {
    return this._searchTime;
  }

  setSearchTime(time: string) {
    if (!time.match(/^([0-1][0-9]|2[0-4]):[0-5][0-9]$/)) {
      console.error(Error("invalid time data"));
    }
    this._searchTime = time;
  }

  async fetchJourneys() {
    let params = new URLSearchParams({
      from: this._departureStationId,
      to: this._arrivalStationId,
      nationalExpress: this._useNational ? "true" : "false",
      national: this._useNational ? "true" : "false",
      results: "5"
    });
    // set arrival or departure
    params.set(this._isArrival ? "arrival" : "departure", this._searchTime);

    let url = `https://v5.db.transport.rest/journeys?${params.toString()}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const data = await res.json();

      if (this._isArrival) {
        // retrieve data again by laterThan
        params.delete("arrival");
        params.set("laterThan", data.laterRef);
        const laterUrl = `https://v5.db.transport.rest/journeys?${params.toString()}`;
        const laterRes = await fetch(laterUrl);
        const laterData = await laterRes.json();
        this._journeys = laterData["journeys"] as journey[];
      } else {
        // showing departure does not need additional fetch
        this._journeys = data["journeys"] as journey[];
      }
    } catch (e) {
      console.error(e);
    }
  }

  toggleNational(useNational: boolean) {
    this._useNational = useNational;
  }

  toggleType(isArrival: boolean) {
    this._isArrival = isArrival;
  }
}
