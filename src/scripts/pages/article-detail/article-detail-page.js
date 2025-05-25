import {
  generateLoaderAbsoluteTemplate,
  generateArticleDetailErrorTemplate,
  generateArticleDetailTemplate,
  generateSaveArticleButtonTemplate,
  generateRemoveArticleButtonTemplate,
} from "../../templates";
import { createCarousel } from "../../utils";
import ArticleDetailPresenter from "./article-detail-presenter";
import { parseActivePathname } from "../../routes/url-parser";
import * as ArticleAppAPI from "../../data/api";

export default class ArticleDetailPage {
  #presenter = null;

  async render() {
    return `
      <section>
        <div class="Article-detail__container">
          <div id="Article-detail" class="Article-detail"></div>
          <div id="Article-detail-loading-container"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new ArticleDetailPresenter(parseActivePathname().id, {
      view: this,
      apiModel: ArticleAppAPI,
    });

    this.#presenter.showArticleDetail();
  }

  async populateArticleDetailAndInitialMap(message, Article) {
    document.getElementById("Article-detail").innerHTML =
      generateArticleDetailTemplate({
        name: Article.name,
        description: Article.description,
        photoUrl: Article.photoUrl,
        createdAt: Article.createdAt,
      });

    // Carousel images
    createCarousel(document.getElementById("images"));

    // Actions buttons
    this.#presenter.showSaveButton();
    this.addNotifyMeEventListener();
  }

  populateArticleDetailError(message) {
    document.getElementById("article-detail").innerHTML =
      generateArticleDetailErrorTemplate(message);
  }

  renderSaveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateSaveArticleButtonTemplate();

    document
      .getElementById("article-detail-save")
      .addEventListener("click", async () => {
        alert("Fitur simpan article akan segera hadir!");
      });
  }

  renderRemoveButton() {
    document.getElementById("save-actions-container").innerHTML =
      generateRemoveArticleButtonTemplate();

    document
      .getElementById("article-detail-remove")
      .addEventListener("click", async () => {
        alert("Fitur simpan article akan segera hadir!");
      });
  }

  showArticleDetailLoading() {
    document.getElementById("article-detail-loading-container").innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideArticleDetailLoading() {
    document.getElementById("article-detail-loading-container").innerHTML = "";
  }

  showNotificationSuccess(message) {
    // Display success message to user
    alert(message);
  }

  showNotificationError(message) {
    // Display error message to user
    alert(message);
  }
}
