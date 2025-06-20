import { getActiveRoute } from "../routes/url-parser";
import {
  generateAuthenticatedNavigationListTemplate,
  generateMainNavigationListTemplate,
  generateUnauthenticatedNavigationListTemplate,
} from "../templates";
import { setupSkipToContent, transitionHelper } from "../utils";
import { getAccessToken, getLogout } from "../utils/auth";
import { routes } from "../routes/routes";

export default class App {
  #content;
  #drawerButton;
  #drawerNavigation;
  #skipLinkButton;

  constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#drawerNavigation.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      const isTargetInsideDrawer = this.#drawerNavigation.contains(
        event.target
      );
      const isTargetInsideButton = this.#drawerButton.contains(event.target);

      if (!(isTargetInsideDrawer || isTargetInsideButton)) {
        this.#drawerNavigation.classList.remove("open");
      }

      this.#drawerNavigation.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#drawerNavigation.classList.remove("open");
        }
      });
    });
  }

  #setupNavigationList() {
    const isLogin = !!getAccessToken();
    const navListMain =
      this.#drawerNavigation.children.namedItem("navlist-main");
    const navList = this.#drawerNavigation.children.namedItem("navlist");

    if (!isLogin) {
      navListMain.innerHTML = "";
      navList.innerHTML = generateUnauthenticatedNavigationListTemplate();
      return;
    }

    navListMain.innerHTML = generateMainNavigationListTemplate();
    navList.innerHTML = generateAuthenticatedNavigationListTemplate();

    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();

      if (confirm("Apakah Anda yakin ingin keluar?")) {
        getLogout();

        // Redirect
        location.hash = "/login";
      }
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    console.log("url", url);
    
    // Check if route exists
    if (!routes[url]) {
      console.error(`Route not found for URL: ${url}`);
      // Redirect to home or login based on auth status
      const isAuthenticated = !!getAccessToken();
      location.hash = isAuthenticated ? "/" : "/login";
      return;
    }

    try {
      const route = routes[url];
      console.log("route", route);
      
      // Get page instance
      const page = route();

      // Check if page is valid
      if (!page) {
        console.log(`Auth redirect occurred for route: ${url}`);
        return; // Stop execution, redirect is handled by auth functions
      }

      const transition = transitionHelper({
        updateDOM: async () => {
          this.#content.innerHTML = await page.render();
          if (typeof page.afterRender === "function") {
            page.afterRender();
          }
        },
      });

      transition.ready.catch(console.error);
      transition.updateCallbackDone.then(() => {
        scrollTo({ top: 0, behavior: "instant" });
        this.#setupNavigationList();
      });
    } catch (error) {
      console.error("Error rendering page:", error);
      // Fallback based on authentication status
      const isAuthenticated = !!getAccessToken();
      location.hash = isAuthenticated ? "/" : "/login";
    }
  }
}