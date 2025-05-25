import LoginPresenter from "./login-presenter";
import * as StoryAppAPI from "../../../data/api";
import * as AuthModel from "../../../utils/auth";

export default class LoginPage {
  #presenter = null;

  async render() {
    document.body.classList.add("auth-page");

    return `
      <section class="login-container">
        <div class="login-form-section">
        
          <div class="login-form-container">
            <h1 class="login__title">RAMALKRIPTO.ID</h1>
            <h2 class="login__subtitle">Login</h2>
            <p class="login__description">Enter your email and password</p>
            
            <form id="login-form" class="login-form">
              <div class="form-control">
                <input id="email-input" type="email" name="email" placeholder="Email" required>
              </div>
              <div class="form-control">
                <input id="password-input" type="password" name="password" placeholder="Password" required>
              </div>
              <p class="login-form__forgot-password">
                <a href="#/forgot-password">Forgot Password?</a>  
              </p>
              <div class="form-buttons">
                <div id="submit-button-container">
                  <button class="btn" type="submit">Login</button>
                </div>
                <p class="login-form__do-not-have-account">Don't have an account? <a href="#/register">Register</a></p>
              </div>
            </form>
          </div>

           <div class="login-image-container">
          <img class="login-image" src="./images/hero.png" alt="Bitcoin Image">
          </div>
        </div>
       
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: StoryAppAPI,
      authModel: AuthModel,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
          email: document.getElementById("email-input").value,
          password: document.getElementById("password-input").value,
        };
        await this.#presenter.getLogin(data);
      });
  }

  loginSuccessfully(message) {
    console.log(message);

    document.body.classList.remove("auth-page");

    // Redirect
    location.hash = "/";
  }

  loginFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Login
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="btn" type="submit">Login</button>
    `;
  }

  // Method untuk cleanup ketika meninggalkan halaman
  destroy() {
    document.body.classList.remove("auth-page");
  }
}
