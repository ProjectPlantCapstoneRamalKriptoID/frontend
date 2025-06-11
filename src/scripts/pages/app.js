import { getActiveRoute } from "../routes/url-parser";
import {
  generateMainNavigationListTemplate,
} from "../templates";
import { setupSkipToContent, transitionHelper } from "../utils";
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
    const navListMain =
      this.#drawerNavigation.children.namedItem("navlist-main");

    navListMain.innerHTML = generateMainNavigationListTemplate();
  }

  async renderPage() {
    const url = getActiveRoute();
    console.log("url", url);

    // Check if route exists
    if (!routes[url]) {
      console.error(`Route not found for URL: ${url}`);
      // Redirect ke home saja
      location.hash = "/";
      return;
    }

    try {
      const route = routes[url];
      console.log("route", route);

      // Get page instance
      const page = route();

      if (!page) {
        console.error(`Page instance is null for route: ${url}`);
        location.hash = "/"; 
        return;
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
      location.hash = "/";
    }
  }
}
