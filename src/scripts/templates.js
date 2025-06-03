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
    <li><a id="learn-button" class="learn-button" href="#/learn">Edukasi</a></li>
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
        <i class="fas fa-user-circle"></i>
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
      <p>There is no article available</p>
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

export function generateArticleDetailErrorTemplate(message) {
  return `
    <div id="articles-detail-error" class="articles-detail__error">
      <h2>Terjadi kesalahan pengambilan detail cerita</h2>
      <p>${
        message ? message : "Gunakan jaringan lain atau laporkan error ini."
      }</p>
    </div>
  `;
}

export function generateArticleItemTemplate({
  id,
  name,
  description,
  photoUrl,
  createdAt,
  location,
}) {
  return `
    <div tabindex="0" class="article-item" data-articleid="${id}">
      <img class="article-item__image" src="${
        Array.isArray(photoUrl) ? photoUrl[0] : photoUrl
      }" alt="${name}" loading="lazy">
      <div class="article-item__body">
        <div class="article-item__main">
          <div class="article-item__more-info">
            <div class="article-item__createdat">
              <i class="fas fa-calendar-alt"></i> ${showFormattedDate(
                createdAt,
                "id-ID"
              )}
            </div>
            <div class="article-item__header">
              <h3 class="article-item__title">
                <a href="#/stories/${id}" class="article-item__title-link">Ditulis oleh: ${name}</a>
              </h3>
             </div>
            <div class="article-item__location">
              <i class="fas fa-map"></i> ${Object.values(location)}
            </div>
          </div>
        </div>
        <div id="article-description" class="article-item__description">
          ${
            description.length > 100
              ? description.substring(0, 100) + "..."
              : description
          }
        </div>
      
        <a class="btn article-item__read-more" href="#/articles/${id}">
          Selengkapnya <i class="fas fa-arrow-right"></i>
        </a>
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

export function generateArticleDetailTemplate({
  name,
  description,
  photoUrl,
  latitudeLocation,
  longitudeLocation,
  createdAt,
}) {
  const createdAtFormatted = showFormattedDate(createdAt, "id-ID");

  let imagesHtml = "";
  if (Array.isArray(photoUrl)) {
    imagesHtml = photoUrl.reduce(
      (accumulator, photoUrl) =>
        accumulator.concat(generateArticleDetailImageTemplate(photoUrl, name)),
      ""
    );
  } else if (photoUrl) {
    // Handle case when photoUrl is a single string
    imagesHtml = generateArticleDetailImageTemplate(photoUrl, name);
  }

  return `
    <div class="article-detail__header">

      <div class="article-detail__more-info">
        <div class="article-detail__more-info__inline">
          <div id="createdat" class="article-detail__createdat" data-value="${createdAtFormatted}"><i class="fas fa-calendar-alt"></i></div>
        </div>
        <div class="article-detail__more-info__inline">
          <div id="location-latitude" class="article-detail__location__latitude" data-value="${latitudeLocation}">Latitude:</div>
          <div id="location-longitude" class="article-detail__location__longitude" data-value="${longitudeLocation}">Longitude:</div>
        </div>
        <div id="author" class="article-detail__author" data-value="${name}">Ditulis oleh:</div>
      </div>
     
    </div>

    <div class="container">
      <div class="article-detail__images__container">
        <div id="images" class="article-detail__images">${imagesHtml}</div>
      </div>
    </div>

    <div class="container">
      <div class="article-detail__body">
        <div class="article-detail__body__description__container">
          <h2 class="article-detail__description__title">Informasi Lengkap</h2>
          <div id="description" class="article-detail__description__body">
            ${description}
          </div>
        </div>
      
        <hr>
  
        
        </div>
      </div>
    </div>
  `;
}

export function generateSaveArticleButtonTemplate() {
  return `
    <button id="article-detail-save" class="btn btn-transparent">
      Save <i class="far fa-bookmark"></i>
    </button>
  `;
}

export function generateRemoveArticleButtonTemplate() {
  return `
    <button id="article-detail-remove" class="btn btn-transparent">
      Remove <i class="fas fa-bookmark"></i>
    </button>
  `;
}
