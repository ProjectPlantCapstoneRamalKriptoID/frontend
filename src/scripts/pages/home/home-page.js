import {
  generateLoaderAbsoluteTemplate,
  generateArticleItemTemplate,
  generateArticlesListErrorTemplate,
  generateArticlesListEmptyTemplate,
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
            src="./images/hero.jpeg"
            alt="Hero Image">
          <div class="hero__content">
            <h1 class="hero__title">Investasi Kripto yang Lebih Aman dengan Prediksi Cerdas</h1>
            <p class="hero__description">
               Analisi harga dan buat keputusan dengan percaya diri
            </p>
            <a href="#/prediction" class="hero__button">Mulai Sekarang</a>
        </div>
        </div>
      </section>

      <section class="container">
        <h1 class="section-title">Artikel terbaru</h1>
        <div class="articles-list__container">
          <div id="articles-list"></div>
          <div id="articles-list-loading-container"></div>
        </div>

        <div class="articles-list__footer">
          <a href="#/article" class="signup-button view-all-articles-button">Lebih Banyak</a>
        </div>
          
      </section>

      <section class="container">
        <h1 class="section-title">Tantangan Investor Kripto Indonesia</h1>
        <div class="cards-container">
          <div class="cards">
            <img src="./images/volatility.png" alt="Card Image 1">
            <h2 class="card__title">Volatilitas Harga</h2>
            <p class="card__description">Berdasarkan survei terhadap 40 responden, sebagian besar investor mengalami kerugian karena volatilitas harga yang tinggi dan ketidakpastian pasar.</p>
          </div>
          <div class="cards">
            <img src="./images/dart.png" alt="Card Image 2">
            <h2 class="card__title">Prediksi Kurang Akurat</h2>
            <p class="card__description">Platform prediksi yang ada saat ini sulit dipahami, tidak bisa disesuaikan dengan waktu tertentu, dan tingkat akurasinya masih rendah.</p>
          </div>
          <div class="cards">
            <img src="./images/clock.png" alt="Card Image 3">
            <h2 class="card__title">Kurang Monitoring Real-time</h2>
            <p class="card__description">Hanya 35% investor yang memantau harga secara harian, sementara 80% menginginkan prediksi harian atau real-time untuk keputusan yang lebih baik.</p>
          </div>
          </div>
      </section>

      <section class="container">
        <div class="start_prediction">
          <h1 class="start_prediction-title">Mulai Prediksi Sekarang</h1>
          <p class="start_prediction__description">
              Dapatkan prediksi berbasis AI untuk Bitcoin. Buat keputusan investasi yang lebih cerdas dengan teknologi LSTM-GRU terdepan.
          </p>
          <a href="#/prediction" class="start_prediction__button">Prediksi Sekarang</a>
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
