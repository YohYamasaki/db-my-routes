import m, { Children, ClassComponent, Vnode } from "mithril";
import { JourneyListModel } from "../../models/JourneyListModel";
import { appActions, appState } from "../../states/appState";
import { Header } from "../components/Header";
import { JourneyTile } from "../components/JourneyTile";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { ToggleSwitch } from "../components/parts/ToggleSwitch";

interface JourneyListPageAttrs {
  departureId: string;
  departureName: string;
  arrivalId: string;
  arrivalName: string;
}

export class JourneyListPage implements ClassComponent<JourneyListPageAttrs> {
  private model: JourneyListModel | undefined;

  async oninit({ attrs }: Vnode<JourneyListPageAttrs>) {
    // init model
    this.model = new JourneyListModel(attrs.departureId, attrs.arrivalId, true);
    // fetch journey data
    await this.model.fetchJourneys();
    m.redraw();
  }

  view({ attrs }: Vnode<JourneyListPageAttrs>): void | Children {
    return m("div.w-full.min-h-screen", [
      m(Header, {
        title: "Journey List",
        showBackButton: true,
        showButton: true,
        buttonText: "Update",
        onButtonClick: async () => {
          // Update data
          appActions.showLoading();
          await this.model?.fetchJourneys();
          appActions.hideLoading();
          m.redraw();
        },
      }),
      m(LoadingOverlay, { isShow: appState.isLoading }),
      m(
        "h2.text-2xl.font-bold.mt-2",
        `${attrs.departureName} -> ${attrs.arrivalName}`
      ),
      // Toggle National trains
      m(ToggleSwitch, {
        onChange: (useNational: boolean) => {
          this.model?.toggleNational(useNational);
        },
        label: "Include ICE/IC",
        default: true,
      }),
      // Toggle departure or arrival
      m(ToggleSwitch, {
        onChange: (isArrival: boolean) => this.model?.toggleType(isArrival),
        label: "Include arriving trains after current time",
      }),
      // time picker
      m("div.my-2", [
        m("label.mr-2", { for: "time-picker" }, "Select Time"),
        m(
          "input#time-picker.text-gray-600.font-bold.px-2.py-1.rounded-md.bg-gray-200",
          {
            type: "time",
            value: this.model?.searchTime,
            onchange: (e: any) => {
              this.model?.setSearchTime(e.target.value);
            },
          }
        ),
      ]),
      // Journey list
      m(
        "div.py-4",
        this.model?.journeys.map((journey) =>
          m(JourneyTile, {
            arrivalStationName: attrs.arrivalName,
            departureStationName: attrs.departureName,
            journey: journey,
          })
        )
      ),
    ]);
  }
}
