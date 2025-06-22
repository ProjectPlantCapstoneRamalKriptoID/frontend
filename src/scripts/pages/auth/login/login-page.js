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

            <p class="login__description">Masukkan email dan kata sandi Anda</p>
          
            <form id="login-form" class="login-form">
              <div class="form-control">
                <input id="email-input" type="email" name="email" placeholder="Email" required>
              </div>

              <div class="form-control">
                <input id="password-input" type="password" name="password" placeholder="Password" required>
              </div>
              
              <div class="form-buttons">
                <div id="submit-button-container">
                  <button class="button" type="submit">Login</button>
                </div>
                
                <p class="login-form__do-not-have-account">Tidak punya akun? <a href="#/register">Register</a></p>
              </div>
            </form>
          </div>

           <div class="login-image-container">
          <img class="login-image" src="./images/hero.jpeg" alt="Bitcoin Image">
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

        const email = document.getElementById("email-input").value.trim();
        const password = document.getElementById("password-input").value;

        if (!email) {
          this.loginFailed("Email harus diisi");
          return;
        }

        if (!password) {
          this.loginFailed("Password harus diisi");
          return;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          this.loginFailed("Format email tidak valid");
          return;
        }

        const data = { email, password };
        await this.#presenter.getLogin(data);
      });
  }

  loginSuccessfully(message, data) {
    alert(message);
    document.body.classList.remove("auth-page");

    if (data && data.loginResult && data.loginResult.token) {
      console.log("Login token:", data.loginResult.token);
    }

    // Redirect to home or dashboard
    location.hash = "/";
  }

  loginFailed(message) {
    if (
      message.includes("email not verified") ||
      message.includes("Email belum diverifikasi")
    ) {
      const enhancedMessage =
        message +
        "\n\n💡 Tips:\n• Cek folder spam/junk email Anda\n• Pastikan Anda mengklik link verifikasi di email\n• Jika tidak menerima email, coba daftar ulang";
      alert(enhancedMessage);
    } else {
      alert(message);
    }
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="button" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Masuk...
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container").innerHTML = `
      <button class="button" type="submit">Login</button>
    `;
  }

  destroy() {
    document.body.classList.remove("auth-page");
  }
}
