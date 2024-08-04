export interface departureTrip {
    currentTripPosition: {
        latitude: number,
        longitude: number,
        type: string,
    },
    delay?: string,
    destination?: {
        id: string,
        location: {
            type: string,
            id: string,
            latitude: number,
            longitude: number
        },
        name: string,
        products: {
            bus: boolean,
            ferry: boolean,
            national: boolean,
            nationalExpress: boolean,
            regional: boolean,
            regionalExpress: boolean,
            suburban: boolean,
            subway: boolean,
            taxi: boolean,
            tram: boolean,
        },
        type: string,
    },
    // Depending on the HAFAS endpoint, the destination may be present:
    direction: string,
    line: {
        express: boolean,
        fahrtNr: string,
        id: string,
        metro: boolean,
        mode: string,
        name: string,
        night: boolean,
        nr: number,
        operator: {
            id: string,
            name: string,
            type: string
        },
        product: string,
        public: boolean,
        symbol: string,
        type: string
    },
    plannedPlatform: string,

    plannedWhen: string,

    platform: string,
    stop: {
        id: string,
        location: {
            latitude: number,
            longitude: number,
            type: string
        },
        name: string,
        products: {
            bus: boolean,
            express: boolean,
            ferry: boolean,
            regional: boolean,
            suburban: boolean,
            subway: boolean,
            tram: boolean
        },
        type: string
    },
    trip: number,
    tripId: string,
    when: string
}