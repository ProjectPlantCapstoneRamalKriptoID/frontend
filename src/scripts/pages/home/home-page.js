import {
  generateLoaderAbsoluteTemplate,
  generateArticleItemTemplate,
  generateArticlesListEmptyTemplate,
  generateArticlesListErrorTemplate,
} from "../../templates";
import HomePresenter from "./home-presenter";
import * as ArticleAPI from "../../data/api";

export default class HomePage {
  #presenter = null;

  async render() {
    return `
      <section>
        <div class="hero">
          <img
            class="hero__image"
            src="./images/hero.png"
            alt="Hero Image">
          <div class="hero__content">
            <h1 class="hero__title">Safer Crypto Investment with Smart Predictions</h1>
            <p class="hero__description">
              Understand the risks, analyze prices, and make decisions with confidence.
            </p>
            <a href="#/prediction" class="hero__button">See  Today’s Prediction</a>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">Article</h1>

        <div class="articles-list__container">
          <div id="articles-list"></div>
          <div id="articles-list-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({
      view: this,
      model: ArticleAPI,
    });

    await this.#presenter.initialArticles();
  }

  populateArticlesList(message, articles) {
    if (!articles || articles.length <= 0) {
      this.populatearticlesListEmpty();
      return;
    }

    const articlesHTML = articles
      .map((article) => generateArticleItemTemplate(article))
      .join("");

    document.getElementById("articles-list").innerHTML = `
      <div class="articles-container">
        ${articlesHTML}
      </div>
    `;
  }

  populatearticlesListEmpty() {
    document.getElementById("articles-list").innerHTML =
      generatearticlesListEmptyTemplate();
  }

  populatearticlesListError(message) {
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
