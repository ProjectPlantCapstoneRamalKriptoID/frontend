// import RegisterPage from "../pages/auth/register/register-page";
// import LoginPage from "../pages/auth/login/login-page";
import HomePage from "../pages/home/home-page";
import PredictionPage from "../pages/prediction/prediction-page";
// import ProfilePage from "../pages/profile/profile-page";
import PredictionHistoryPage from "../pages/prediction/prediction-history-page";
import ArticlePage from "../pages/article/article-page";

export const routes = {
  // "/login": () => new LoginPage(),
  // "/register": () => new RegisterPage(),
  "/": () => new HomePage(),
  "/prediction": () => new PredictionPage(),
  // "/profile": () => new ProfilePage(),
  "/prediction-history": () => new PredictionHistoryPage(),
  "/article": () => new ArticlePage(),
};
