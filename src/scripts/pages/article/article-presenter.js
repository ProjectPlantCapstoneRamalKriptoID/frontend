export default class ArticlePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async initialArticles() {
    this.#view.showLoading();
    try {
      const response = await this.#model.getAllArticles();

      if (!response.ok) {
        console.error("initialArticles: response:", response);
        this.#view.populateArticlesListError(response.message);
        return;
      }

      this.#view.populateArticlesList(response.message, response.data);
    } catch (error) {
      console.error("initialArticles: error:", error);
      this.#view.populateArticlesListError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}
