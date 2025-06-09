import {
  generateLoaderAbsoluteTemplate,
  generateArticleItemTemplate,
  generateArticlesListErrorTemplate,
  generateArticlesListEmptyTemplate,
} from "../../templates";
import ArticlePresenter from "./article-presenter";
import * as ArticleAPI from "../../data/api";

export default class ArticlePage {
  #presenter = null;

  async render() {
    return `
     <section class="container">
        <h1 class="section-title">Artikel terbaru</h1>
        <div class="articles-list__container">
          <div id="articles-list"></div>
          <div id="articles-list-loading-container"></div>
        </div>      
        </section>`;
  }

  async afterRender() {
    this.#presenter = new ArticlePresenter({
      view: this,
      model: ArticleAPI,
    });

    await this.#presenter.initialArticles();
  }

  populateArticlesList(message, articles) {
    if (!articles || articles.length <= 0) {
      this.populateArticlesListEmpty();
      return;
    }

    const articlesHTML = articles
      .map((article) => generateArticleItemTemplate(article))
      .join("");

    document.getElementById("articles-list").innerHTML = articlesHTML;
  }

  populateArticlesListEmpty() {
    document.getElementById("articles-list").innerHTML =
      generateArticlesListEmptyTemplate();
  }

  populateArticlesListError(message) {
    document.getElementById("articles-list").innerHTML =
      generateArticlesListErrorTemplate(message);
  }

  showLoading() {
    document.getElementById("articles-list-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById("articles-list-loading-container").innerHTML = "";
  }
}
