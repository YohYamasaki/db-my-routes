import mq from "mithril-query";
import { JourneyListPage } from "../src/views/pages/JourneyListPage";

describe("sample", () => {
  it("component test", () => {
    const result = mq(JourneyListPage, {
      departureId: "8000128",
      departureName: "Göttingen",
      arrivalId: "8000152",
      arrivalName: "Hannover Hbf"
    });

    result.should.contain("Göttingen -> Hannover Hbf");
  });
});
