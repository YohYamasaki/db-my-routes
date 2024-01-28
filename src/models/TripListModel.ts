import m from 'mithril';
import trip from '../types/trip'

interface ITripListModel {
	tripList: trip[],
}

class TripListModel implements ITripListModel {
	private _tripList: trip[] = [];

	get tripList() {
		return this._tripList;
	}
}