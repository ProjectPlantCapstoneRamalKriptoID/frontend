import * as StoryAppAPI from "../../data/api";

export default class VerifyEmailPage {
  async render() {
    document.body.classList.add("auth-page");

    return `
      <section class="verify-container">
        <div class="verify-content">
          <div class="verify-card">
            <div id="verify-loading" class="verification-loading">
              <div class="spinner"></div>
              <h2>Memverifikasi Email...</h2>
              <p>Harap tunggu sebentar</p>
            </div>
            
            <div id="verify-success" class="verification-result success" style="display: none;">
              <div class="success-icon">✓</div>
              <h2>Email Berhasil Diverifikasi!</h2>
              <p>Akun Anda telah aktif. Anda sekarang dapat login.</p>
              <button id="go-to-login" class="button">Login Sekarang</button>
            </div>
            
            <div id="verify-error" class="verification-result error" style="display: none;">
              <div class="error-icon">✗</div>
              <h2>Verifikasi Gagal</h2>
              <p id="error-message">Link verifikasi tidak valid atau sudah expired</p>
              <div class="error-actions">
                <button id="go-to-register" class="button">Daftar Ulang</button>
                <button id="contact-support" class="button-secondary">Hubungi Support</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await this.#handleVerification();
    this.#setupEventListeners();
  }

  async #handleVerification() {
    try {
      // Get token from URL hash or query params
      const token = this.#extractTokenFromUrl();
      
      if (!token) {
        this.#showError('Token verifikasi tidak ditemukan dalam URL');
        return;
      }

      console.log('Attempting to verify token:', token);

      // Call the verification API
      const result = await StoryAppAPI.verifyEmail(token);

      if (result.success) {
        this.#showSuccess(result.message);
      } else {
        this.#showError(result.message);
      }
    } catch (error) {
      console.error('Verification error:', error);
      this.#showError('Terjadi kesalahan saat verifikasi email');
    }
  }

  #extractTokenFromUrl() {
    // Try to get token from URL hash first (e.g., #/verify-email/TOKEN)
    const hash = window.location.hash;
    const hashMatch = hash.match(/\/verify-email\/(.+)/);
    if (hashMatch) {
      return decodeURIComponent(hashMatch[1]);
    }

    // Try to get token from query params (e.g., ?token=TOKEN)
    const urlParams = new URLSearchParams(window.location.search);
    const queryToken = urlParams.get('token');
    if (queryToken) {
      return decodeURIComponent(queryToken);
    }

    // Try to get token from path (e.g., /verify-email/TOKEN)
    const pathMatch = window.location.pathname.match(/\/verify-email\/(.+)/);
    if (pathMatch) {
      return decodeURIComponent(pathMatch[1]);
    }

    return null;
  }

  #showSuccess(message) {
    document.getElementById('verify-loading').style.display = 'none';
    document.getElementById('verify-error').style.display = 'none';
    document.getElementById('verify-success').style.display = 'block';
    
    if (message) {
      document.querySelector('#verify-success p').textContent = message;
    }
  }

  #showError(message) {
    document.getElementById('verify-loading').style.display = 'none';
    document.getElementById('verify-success').style.display = 'none';
    document.getElementById('verify-error').style.display = 'block';
    
    if (message) {
      document.getElementById('error-message').textContent = message;
    }
  }

  #setupEventListeners() {
    // Login button
    const loginBtn = document.getElementById('go-to-login');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        location.hash = '/login';
      });
    }

    // Register button
    const registerBtn = document.getElementById('go-to-register');
    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        location.hash = '/register';
      });
    }

    // Contact support button
    const supportBtn = document.getElementById('contact-support');
    if (supportBtn) {
      supportBtn.addEventListener('click', () => {
        // Replace with your actual support contact method
        alert('Hubungi kami di: support@ramalkripto.id');
      });
    }
  }

  destroy() {
    document.body.classList.remove("auth-page");
  }
}