import { JourneyListModel } from "../src/models/JourneyListModel";
import { journeyLeg } from "../src/types/journey";

const journeyMockResponse = (
  isOk: boolean,
  status: number,
  statusText: string,
  legs?: journeyLeg[]
) => {
  const res: any = {
    ok: isOk,
    status: status,
    statusText: statusText
  };
  if (isOk) {
    res.json = () =>
      Promise.resolve({
        journeys: [
          {
            legs: legs,
            refreshToken: "dummyRefreshToken"
          }
        ]
      });
  }
  return Promise.resolve(res);
};

const dummySuccessfulLeg: journeyLeg = {
  arrival: "2024-02-23T14:10:00+01:00",
  arrivalDelay: 0,
  arrivalPlatform: "1",
  cancelled: false,
  departure: "2024-02-23T14:07:00+01:00",
  departureDelay: null,
  departurePlatform: "2",
  direction: "Hannover Hbf",
  line: {
    id: "me-re2",
    name: "ME RE2"
  },
  plannedArrival: "2024-02-23T14:10:00+01:00",
  plannedArrivalPlatform: "1",
  plannedDeparture: "2024-02-23T14:07:00+01:00",
  plannedDeparturePlatform: "2",
  tripId: "1|254811|0|80|23022024"
};

describe("JourneyListModel.fetchJourneys()", () => {
  let model: JourneyListModel;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should log error when invalid stationIds are provided", async () => {
    // assertion
    expect(
      () =>
        new JourneyListModel("invalid-station-id", "invalid-station-id", false)
    ).toThrow(Error);
  });

  test("should update journeys with valid data when the 200 response is provided", async () => {
    // Initiate model with Göttingen to Hannover
    model = new JourneyListModel("8000128", "8000152", false);
    // mock the fetch function
    global.fetch = jest.fn(() =>
      journeyMockResponse(true, 200, "OK", [dummySuccessfulLeg])
    ) as jest.Mock;
    // call the target method
    await model.fetchJourneys();
    // assertion
    expect(model.journeys[0].legs.length).toBe(1);
    expect(model.journeys[0].legs[0].line.name).toBe("ME RE2");
    expect(model.journeys[0].refreshToken).toBe("dummyRefreshToken");
  });

  test("should log error when the 500 response is provided", async () => {
    // Initiate model with Göttingen to Hannover
    model = new JourneyListModel("8000128", "8000152", false);
    // mock the fetch function
    global.fetch = jest.fn(() =>
      journeyMockResponse(false, 500, "Internal Server Error")
    ) as jest.Mock;
    // spy console
    const consoleErrorSpy = jest.spyOn(console, "error");
    // call the target method
    await model.fetchJourneys();
    // assertion
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      new Error("500 Internal Server Error")
    );
  });

  test("should fetch correctly when arrival search", async () => {
    // Initiate model with Göttingen to Hannover
    model = new JourneyListModel("8000128", "8000152", false);
    model.toggleType(true);
    // mock the fetch function
    global.fetch = jest.fn(() =>
      journeyMockResponse(true, 200, "OK", [dummySuccessfulLeg])
    ) as jest.Mock;
    // call the target method
    await model.fetchJourneys();
    // assertion
    expect(model.journeys[0].legs.length).toBe(1);
    expect(model.journeys[0].legs[0].line.name).toBe("ME RE2");
    expect(model.journeys[0].refreshToken).toBe("dummyRefreshToken");
  });
});

describe("JourneyListModal.setSearchTime()", () => {
  let model: JourneyListModel;

  test("should set searchTime when a valid data is passed", () => {
    // Initiate model with Göttingen to Hannover, arrival search
    model = new JourneyListModel("8000128", "8000152", false);
    // call the target method
    model.setSearchTime("12:00");
    // assertion
    expect(model.searchTime).toBe("12:00");
  });

  test("should log error when a invalid data is passed", () => {
    // Initiate model with Göttingen to Hannover, arrival search
    model = new JourneyListModel("8000128", "8000152", false);
    // spy console
    const consoleErrorSpy = jest.spyOn(console, "error");
    // call the target method
    model.setSearchTime("invalid:time");
    // assertion
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      new Error("invalid time data")
    );
    // call the target method
    model.setSearchTime("25:39");
    // assertion
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      new Error("invalid time data")
    );
  });
});
