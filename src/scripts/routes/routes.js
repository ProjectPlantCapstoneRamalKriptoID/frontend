import RegisterPage from "../pages/auth/register/register-page";
import LoginPage from "../pages/auth/login/login-page";
import HomePage from "../pages/home/home-page";
import PredictionPage from "../pages/prediction/prediction-page";
import PredictionHistoryPage from "../pages/prediction/prediction-history-page";
import ProfilePage from "../pages/profile/profile-page";
import ArticlePage from "../pages/article/article-page";

import {
  checkAuthenticatedRoute,
  checkUnauthenticatedRouteOnly,
} from "../utils/auth";

export const routes = {
  "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),
  "/": () => checkAuthenticatedRoute(new HomePage()),
  "/prediction": () => checkAuthenticatedRoute(new PredictionPage()),
  "/profile": () => checkAuthenticatedRoute(new ProfilePage()),
  "/prediction-history": () =>
    checkAuthenticatedRoute(new PredictionHistoryPage()),
  "/article": () => checkAuthenticatedRoute(new ArticlePage()),
};
