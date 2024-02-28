import { RouteListModel } from "../src/models/RouteListModel";
import { LocalStorageMock } from "../src/mocks/localStorageMock";

describe("AddRouteModel.addRoute()", () => {
  let model: RouteListModel;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // @ts-ignore
    global.localStorage = new LocalStorageMock();
    model = new RouteListModel();
  });

  test("should set proper routes data when localstorage has valid routes data", async () => {
    // Initiate localstorage with Göttingen to Hannover
    localStorage.setItem(
      "routes",
      '[{"departure":{"id":"8000128","name":"Göttingen"},"arrival":{"id":"8000152","name":"Hannover Hbf"}}]'
    );
    // call the target method
    model.getRouteList();

    // assertion
    expect(model.routes[0].departure.id).toBe("8000128");
    expect(model.routes[0].arrival.id).toBe("8000152");
  });

  test("should show error in console when localstorage has invalid routes data", async () => {
    // Initiate localstorage with invalid data
    localStorage.setItem("routes", "invalidData");
    // spy console
    const consoleErrorSpy = jest.spyOn(console, "error");

    // call the target method
    model.getRouteList();

    // assertion
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});

describe("AddRouteModel.deleteRoute()", () => {
  let model: RouteListModel;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // @ts-ignore
    global.localStorage = new LocalStorageMock();
    model = new RouteListModel();
  });

  test("should delete route when proper target number is provided", async () => {
    // Initiate localstorage and routes property with Göttingen to Hannover
    localStorage.setItem(
      "routes",
      '[{"departure":{"id":"8000128","name":"Göttingen"},"arrival":{"id":"8000152","name":"Hannover Hbf"}}]'
    );
    model.getRouteList();

    // call target method
    model.deleteRoute(0);

    // assertion
    expect(model.routes.length).toBe(0);
  });

  test("should show error in console when proper target number is out of the range", async () => {
    // Initiate localstorage and routes property with Göttingen to Hannover
    localStorage.setItem(
      "routes",
      '[{"departure":{"id":"8000128","name":"Göttingen"},"arrival":{"id":"8000152","name":"Hannover Hbf"}}]'
    );
    model.getRouteList();
    // spy console
    const consoleErrorSpy = jest.spyOn(console, "error");

    // call target method
    model.deleteRoute(2);

    console.log(model.routes);

    // assertion
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
