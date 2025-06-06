import RegisterPresenter from "./register-presenter";
import * as StoryAppAPI from "../../../data/api";

export default class RegisterPage {
  #presenter = null;

  async render() {
    document.body.classList.add("auth-page");

    return `
        <section class="register-container">
        <div class="register-form-section">

          <div class="register-form-container">
            <h1 class="register__title">RAMALKRIPTO.ID</h1>
            <h2 class="register__subtitle">Buat Akun</h2>
            <p class="register__description">Gunakan email Anda untuk registrasi</p>
            
            <form id="register-form" class="register-form">
              <div class="form-control">
                <input id="name-input" type="text" name="name" placeholder="Nama Lengkap" required>
              </div>
              <div class="form-control">
                <input id="email-input-reg" type="email" name="email" placeholder="Email" required>
              </div>
              <div class="form-control">
                <input id="password-input-reg" type="password" name="password" placeholder="Password" required>
              </div>
              <div class="form-buttons">
                <div id="submit-button-container-reg">
                  <button class="button" type="submit">Register</button>
                </div>
                <p class="register-form__already-have-account">Sudah punya akun? <a href="#/login">Login</a></p>
              </div>
            </form>
          </div>
          
           <div class="register-image-container">
          <img class="register-image" src="./images/hero.png" alt="Bitcoin Image">
           </div>
        </div>
       
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: StoryAppAPI,
    });

    this.#setupForm();
  }

  #setupForm() {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
          name: document.getElementById("name-input").value,
          email: document.getElementById("email-input-reg").value,
          password: document.getElementById("password-input-reg").value,
        };
        await this.#presenter.getRegistered(data);
      });
  }

  registeredSuccessfully(message) {
    console.log(message);

    document.body.classList.remove("auth-page");

    // Redirect
    location.hash = "/login";
  }

  registeredFailed(message) {
    alert(message);
  }

  showSubmitLoadingButton() {
    document.getElementById("submit-button-container-reg").innerHTML = `
      <button class="btn" type="submit" disabled>
        <i class="fas fa-spinner loader-button"></i> Create account
      </button>
    `;
  }

  hideSubmitLoadingButton() {
    document.getElementById("submit-button-container-reg").innerHTML = `
      <button class="btn" type="submit">Create account</button>
    `;
  }

  destroy() {
    document.body.classList.remove("auth-page");
  }
}
