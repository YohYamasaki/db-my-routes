interface trip {
	departureId: number,
	arrivalId: number,
	departureName: string,
	arrivalName: string,
	departureTime: string,
	arrivalTime: string,
	departurePlatform: string,
	arrivalPlatform: string,
	delay: string,
	trainType: "longDistance" | "local",
	trainName: string
}