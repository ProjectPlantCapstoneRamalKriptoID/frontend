import HomePage from "../pages/home/home-page";
import PredictionPage from "../pages/prediction/prediction-page";
import PredictionHistoryPage from "../pages/prediction/prediction-history-page";
import ArticlePage from "../pages/article/article-page";

export const routes = {
  "/": () => new HomePage(),
  "/prediction": () => new PredictionPage(),
  "/prediction-history": () => new PredictionHistoryPage(),
  "/article": () => new ArticlePage(),
};
