
export default class ArticleDetailPresenter {
  #articleId;
  #view;
  #apiModel;

  constructor(articleId, { view, apiModel }) {
    this.#articleId = articleId;
    this.#view = view;
    this.#apiModel = apiModel;
  }

  async showArticleDetail() {
    this.#view.showArticleDetailLoading();
    try {
      const response = await this.#apiModel.getArticleById(this.#articleId);

      if (!response.ok) {
        console.error("showArticleDetail: response:", response);
        this.#view.populateArticleDetailError(response.message);
        return;
      }

      const Article = await ArticleMapper(response.data);
      console.log(Article);

      this.#view.populateArticleDetailAndInitialMap(response.message, Article);
    } catch (error) {
      console.error("showArticleDetail: error:", error);
      this.#view.populateArticleDetailError(error.message);
    } finally {
      this.#view.hideArticleDetailLoading();
    }
  }

  showSaveButton() {
    if (this.#isArticleSaved()) {
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  }

  #isArticleSaved() {
    return false;
  }
}
