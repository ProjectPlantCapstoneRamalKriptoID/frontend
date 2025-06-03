export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showStroriesList() {
    this.#view.showMapLoading();
    try {
      const response = await this.#model.getAllStories(1, 50, 1);

      if (!response.ok) {
        console.error("showStroriesList: response:", response);
        return;
      }

      await this.#view.initialMap(response.data);
    } catch (error) {
      console.error("showStroriesList: error:", error);
    } finally {
      this.#view.hideMapLoading();
    }
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
