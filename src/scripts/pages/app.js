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
  #dropdown;

  constructor({ content, drawerNavigation, drawerButton, skipLinkButton }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#drawerNavigation = drawerNavigation;
    this.#skipLinkButton = skipLinkButton;
    this.#dropdown = null;

    this.#init();
  }

  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
    this.#setupDrawer();
    this.#initializeDropdown();
  }

  #initializeDropdown() {
    this.#dropdown = {
      activeDropdown: null,

      setupProfileDropdown: () => {
        const profileButton = document.getElementById("profile-button");
        const profileDropdown = document.getElementById("profile-dropdown");

        if (!profileButton || !profileDropdown) return;

        // Handle button click
        profileButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const isOpen = profileDropdown.classList.contains("show");

          // Close all dropdowns first
          document
            .querySelectorAll(".profile-dropdown.show")
            .forEach((dropdown) => {
              dropdown.classList.remove("show");
              dropdown.previousElementSibling?.classList.remove("active");
            });

          // Toggle current dropdown
          if (!isOpen) {
            profileDropdown.classList.add("show");
            profileButton.classList.add("active");
            profileButton.setAttribute("aria-expanded", "true");
            this.#dropdown.activeDropdown = { profileButton, profileDropdown };
          } else {
            profileButton.setAttribute("aria-expanded", "false");
            this.#dropdown.activeDropdown = null;
          }
        });

        // Handle keyboard navigation
        profileButton.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            profileButton.click();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!profileDropdown.classList.contains("show")) {
              profileButton.click();
            }
            // Focus first item
            setTimeout(() => {
              const firstItem = profileDropdown.querySelector(
                ".profile-dropdown-item"
              );
              firstItem?.focus();
            }, 100);
          }
        });

        // Handle dropdown item keyboard navigation
        const dropdownItems = profileDropdown.querySelectorAll(
          ".profile-dropdown-item"
        );
        dropdownItems.forEach((item, index) => {
          item.addEventListener("keydown", (e) => {
            switch (e.key) {
              case "ArrowDown":
                e.preventDefault();
                const nextIndex = (index + 1) % dropdownItems.length;
                dropdownItems[nextIndex].focus();
                break;
              case "ArrowUp":
                e.preventDefault();
                const prevIndex =
                  index === 0 ? dropdownItems.length - 1 : index - 1;
                dropdownItems[prevIndex].focus();
                break;
              case "Escape":
                e.preventDefault();
                profileDropdown.classList.remove("show");
                profileButton.classList.remove("active");
                profileButton.setAttribute("aria-expanded", "false");
                profileButton.focus();
                break;
            }
          });
        });
      },

      closeAllDropdowns: () => {
        document
          .querySelectorAll(".profile-dropdown.show")
          .forEach((dropdown) => {
            dropdown.classList.remove("show");
            const button = dropdown.previousElementSibling;
            if (button) {
              button.classList.remove("active");
              button.setAttribute("aria-expanded", "false");
            }
          });
        this.#dropdown.activeDropdown = null;
      },
    };

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".profile-container")) {
        this.#dropdown.closeAllDropdowns();
      }
    });

    // Close dropdowns on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.#dropdown.closeAllDropdowns();
      }
    });
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
      const isDropdownElement = event.target.closest(".profile-container");

      if (
        !(isTargetInsideDrawer || isTargetInsideButton || isDropdownElement)
      ) {
        this.#drawerNavigation.classList.remove("open");
      }

      // Close drawer for main navigation links
      this.#drawerNavigation
        .querySelectorAll("a:not(.profile-dropdown-item)")
        .forEach((link) => {
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

    setTimeout(() => {
      this.#dropdown.setupProfileDropdown();
      this.#setupLogoutHandler();
    }, 100);
  }

  #setupLogoutHandler() {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (confirm("Apakah Anda yakin ingin keluar?")) {
          getLogout();
          location.hash = "/login";
        }
      });
    }
  }

  async renderPage() {
    const url = getActiveRoute();
    console.log("url", url);

    if (!routes[url]) {
      console.error(`Route not found for URL: ${url}`);
      const isAuthenticated = !!getAccessToken();
      location.hash = isAuthenticated ? "/" : "/login";
      return;
    }

    try {
      const route = routes[url];
      console.log("route", route);

      const page = route();

      if (!page) {
        console.error(`Page instance is null for route: ${url}`);
        const isAuthenticated = !!getAccessToken();
        location.hash = isAuthenticated ? "/" : "/login";
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
        setTimeout(() => {
          this.#setupNavigationList();
        }, 100);
      });
    } catch (error) {
      console.error("Error rendering page:", error);
      const isAuthenticated = !!getAccessToken();
      location.hash = isAuthenticated ? "/" : "/login";
    }
  }
}