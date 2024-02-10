export interface journey {
    cycle?: { min: string },
    legs: journeyLeg[],
    refreshToken: string
}

interface journeyLeg {
    arrival: string,
    arrivalDelay: number | null,
    arrivalPlatform: string,
    cancelled: boolean
    departure: string,
    departureDelay: number | null,
    departurePlatform: string,
    direction: string,
    line: {
        id: string,
        name: string,
    },
    plannedArrival: string,
    plannedArrivalPlatform: string,
    plannedDeparture: string,
    plannedDeparturePlatform: string,
    tripId: string
}