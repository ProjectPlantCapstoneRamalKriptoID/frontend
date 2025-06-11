// src\scripts\templates.js

import { showFormattedDate } from "./utils";

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export function generateMainNavigationListTemplate() {
  return `
    <li><a id="article-list-button" class="article-list-button" href="#/">Beranda</a></li>
    <li><a id="article-button" class="article-button" href="#/article">Artikel</a></li>
    <li><a id="prediction-button" class="prediction-button" href="#/prediction">Prediksi</a></li>
  `;
}

export function generateUnauthenticatedNavigationListTemplate() {
  return `
    <li><a id="login" class="login-button" href="#/login"></i> Login</a></li>
    <li><a id="signup" class="signup-button" href="#/register"></i> Sign Up</a></li>
  `;
}

export function generateAuthenticatedNavigationListTemplate() {
  return `
   <li class="profile-container">
      <button id="profile-button" class="profile-button" type="button">
      <img src="./images/boy.png" alt="Profile Icon" class="profile-icon">
      </button>
      <div id="profile-dropdown" class="profile-dropdown">
        <a href="#/profile" class="profile-dropdown-item">
          <i class="fas fa-user-circle"></i>
          Profil pengguna
        </a>
        <a href="#/prediction-history" class="profile-dropdown-item">
          <i class="fas fa-history"></i>
          Riwayat Prediksi
        </a>
        <hr class="profile-dropdown-divider">
        <a id="logout-button" href="#/logout" class="profile-dropdown-item logout-item">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </a>
      </div>
    </li>

  `;
}

export function generateArticlesListEmptyTemplate() {
  return `
    <div id="articles-list-empty" class="articles-list__empty">
      <i class="fas fa-inbox stories-list__empty-icon"></i>
      <p>Tidak ada artikel yang tersedia</p>
    </div>
  `;
}

export function generateArticlesListErrorTemplate(message) {
  return `
    <div id="articles-detail-error" class="articles-detail__error">
      <h2>Terjadi kesalahan pengambilan detail Article</h2>
      <p>${
        message ? message : "Gunakan jaringan lain atau laporkan error ini."
      }</p>
    </div>
  `;
}

export function generateArticleItemTemplate(article) {
  const id = article.ID || article.id || "";
  const title = article.TITLE || article.title || "No Title";
  const imageUrl =
    article.IMAGE_URL || article.imageUrl || "images/placeholder-image.jpg";
  const author = article.AUTHORS || article.authors || "Unknown Author";
  const body =
    article.BODY ||
    article.body ||
    article.SUBTITLE ||
    "No description available.";
  const url = article.URL || article.url || "#";
  const published_on =
    article.PUBLISHED_ON || article.publishedOn || article.CREATED_ON;

  return `
    <div tabindex="0" class="article-item" data-articleid="${id}">
      <img class="article-item__image" src="${
        Array.isArray(imageUrl) ? imageUrl[0] : imageUrl
      }" alt="${title}" loading="lazy">
      <div class="article-item__body">
        <div class="article-item__main">
          <div class="article-item__more-info">
            <div class="article-item__createdat">
              <i class="fas fa-calendar-alt"></i> ${showFormattedDate(
                published_on * 1000,
                "en-US"
              )}
            </div>
            <div class="article-item__header">
              <h2 class="article-item__title">${title}</h2>
              <div class="article-item__author">
                <i class="fas fa-user"></i>Author : ${author}
              </div>
             </div>
            
          </div>
        </div>
        <div id="article-description" class="article-item__description">
          ${body.length > 100 ? body.substring(0, 100) + "..." : body}
        </div>
        <div class="article-item__url">
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="article-item__url-link">
          View More
          <i class="fas fa-angle-double-right"></i>       
          </a>
        </div>
      </div>
    </div>
  `;
}

export function generateArticleDetailImageTemplate(imageUrl = null, alt = "") {
  if (!imageUrl) {
    return `
      <img class="article-detail__image" src="images/placeholder-image.jpg" alt="Placeholder Image">
    `;
  }

  return `
    <img class="article-detail__image" src="${imageUrl}" alt="${alt}">
  `;
}
