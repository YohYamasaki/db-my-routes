import m, {ClassComponent, Vnode, Children} from "mithril";
import {FeedModel} from "../../models/FeedModel";
import {article} from "../../types/article";
import {Article} from "./Article";
import {DeleteButton} from "../components/DeleteButton";

interface FeedAttrs {
  feedUrl: string;
  removeAction?: Function;
}

export class Feed implements ClassComponent<FeedAttrs> {
  private model: FeedModel = new FeedModel("");
  private visibleArticleCount: number = 10;

  showMoreArticles(): void {
    this.visibleArticleCount = Math.min(
      this.visibleArticleCount + 10,
      this.model.getArticles().length
    );
  }

  hideArticles(): void {
    this.visibleArticleCount = 10;
  }

  hasMoreArticles(): boolean {
    return this.visibleArticleCount !== this.model.getArticles().length;
  }

  oninit({attrs}: Vnode<FeedAttrs>) {
    if (attrs.feedUrl === "" || attrs.feedUrl === null) return;
    this.model = new FeedModel(attrs.feedUrl);
    this.model.updateFeed();
  }

  view({attrs}: Vnode<FeedAttrs>): void | Children {
    const articlesToShow = this.model
      .getArticles()
      .slice(0, this.visibleArticleCount);

    return m(
      "div.py-1.bg-gray-100.border-1.rounded-md.shadow-xl.sm:w-96.w-full",
      [
        m("div.flex.justify-between", [
          m(
            "a",
            {href: this.model.getSiteUrl()},
            m(
              "h1.bg-gray-700.px-4.py-2.m-2.rounded-md.shadow-md.text-xl.font-bold.text-white",
              this.model.getTitle()
            )
          ),
          m(DeleteButton, {
            onclick: () => {
              if (attrs.removeAction === undefined) return;
              attrs.removeAction(this.model.getFeedUrl());
            },
          }),
        ]),
        m(
          "div.mx-4",
          articlesToShow.map((article: article) => {
            return m(Article, {
              key: article.id,
              url: article.url,
              title: article.title,
              description: article.description,
            });
          })
        ),
        // toggle show or hide
        m("div.flex.gap-2.justify-center.mt-2", [
          this.hasMoreArticles() &&
            m(
              "button.rounded-md.bg-gray-500.p-2.w-32.text-white",
              {onclick: () => this.showMoreArticles()},
              "Show More"
            ),
          this.visibleArticleCount !== 10 &&
            m(
              "button.rounded-md.bg-white.border-2.p-2.w-32.text-gray-400",
              {onclick: () => this.hideArticles()},
              "Hide Articles"
            ),
        ]),
      ]
    );
  }
}
