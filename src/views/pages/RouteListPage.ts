import m, {ClassComponent} from "mithril";
import {Header} from "../components/Header";
import {RouteListModel} from "../../models/RouteListModel";
import {ListItem} from "../components/parts/ListItem";

export class RouteListPage implements ClassComponent {
    private model = new RouteListModel();

    oninit() {
        this.model.getRouteList();
    }

    view() {
        return m("div", [
            m(Header, {title: "DB my route"}),
            m("div",
                this.model.routes.map((route, idx) => {
                    return m(ListItem,
                        {
                            key: route.departure.id + route.arrival.id,
                            action: () => this.model.deleteRoute(idx),
                            actionIcon: "Delete"
                        },
                        m(
                            m.route.Link,
                            {
                                href: `/journey-list/${route.departure.name}/${route.departure.id}/${route.arrival.name}/${route.arrival.id}`
                            },
                            [m("p.p-2", `${route.departure.name} -> ${route.arrival.name}`)]
                        ));
                })
            ),
            m(m.route.Link,
                {
                    href: "/add-route"
                },
                m("span.border.p-2.mt-3", "Add Route"))
        ]);
    }
}