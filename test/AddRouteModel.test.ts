import { AddRouteModel } from "../src/models/AddRouteModel";
import { station } from "../src/types/station";
import { LocalStorageMock } from "../src/mocks/localStorageMock";

const sampleStation1: station = {
  id: "8000128",
  name: "Göttingen"
};

const sampleStation2: station = {
  id: "8000152",
  name: "Hannover Hbf"
};

describe("AddRouteModel.addRoute()", () => {
  let model: AddRouteModel;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // @ts-ignore
    global.localStorage = new LocalStorageMock();
  });

  test("should add new route to the localstorage when with the valid departure/arrival", async () => {
    // Initiate model with Göttingen to Hannover
    model = new AddRouteModel();
    model.departure = sampleStation1;
    model.arrival = sampleStation2;

    // call the target method
    model.addRoute();

    // assertion
    expect(localStorage.getItem("routes")).toBe(
      '[{"departure":{"id":"8000128","name":"Göttingen"},"arrival":{"id":"8000152","name":"Hannover Hbf"}}]'
    );
  });

  test("should do nothing when with no departure/arrival data", async () => {
    // Initiate model with Göttingen to Hannover
    model = new AddRouteModel();

    // call the target method
    model.addRoute();

    // assertion
    expect(localStorage.getItem("routes")).toBe(null);
  });
});
