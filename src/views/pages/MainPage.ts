import m, {ClassComponent, Vnode, Children} from "mithril";

interface MainPageAttrs {
	feedUrl: string;
	removeAction?: Function;
}

export class MainPage implements ClassComponent<MainPageAttrs> {
	private data: any[];
	private fetchTest = async () => {
		const url = "https://v6.db.transport.rest/stops/8010159/departures?direction=8011113&duration=120";
		const response = await fetch(url);
		this.data = await response.json();
		console.log(this.data);
		m.redraw();
	}

	view({attrs}: Vnode<MainPageAttrs>): void | Children {
		return m("div",
			[
				m("button.bg-gray-200.p-4.border.hover:opacity-60",
					{
						onclick: () => {
							this.fetchTest();
						},
					},
					"fetch data"),
				m("p",
					this.data ? JSON.stringify(this.data) : "not fetched")
			]
		);
	}
}
