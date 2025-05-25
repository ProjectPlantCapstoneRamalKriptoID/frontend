// src\scripts\data\api.js

import { getAccessToken } from "../utils/auth";
import { BASE_URL } from "../config";

const ENDPOINTS = {
  // Auth
  REGISTER: `${BASE_URL}/register`,
  LOGIN: `${BASE_URL}/login`,
  MY_USER_INFO: `${BASE_URL}/users/me`,

  // Articles
  ARTICLES_LIST: `${BASE_URL}/articles`,
  ARTICLE_DETAIL: (id) => `${BASE_URL}/articles/${id}`,
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getMyUserInfo() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.MY_USER_INFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllArticles(page = 1, size = 10, location = 0) {
  const accessToken = getAccessToken();

  const url = new URL(ENDPOINTS.ARTICLES_LIST);
  url.searchParams.append("page", page);
  url.searchParams.append("size", size);
  url.searchParams.append("location", location);

  const fetchResponse = await fetch(ENDPOINTS.ARTICLES_LIST, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  console.log("API Response:", json);

  const tranformedData = json.listArticle
    ? json.listArticle.map((article) => {
        const hasValidLocation =
          typeof article.lat === "number" && typeof article.lon === "number";

        return {
          ...article,
          location: hasValidLocation
            ? {
                latitude: article.lat,
                longitude: article.lon,
              }
            : null,
        };
      })
    : [];

  return {
    ...json,
    ok: fetchResponse.ok,
    data: tranformedData,
  };
}

export async function getArticleById(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.ARTICLE_DETAIL(id), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  let transformedarticle = null;
  if (json.article) {
    const hasValidLocation =
      typeof json.article.lat === "number" && typeof json.article.lon === "number";

    transformedarticle = {
      ...json.article,
      location: hasValidLocation
        ? {
            latitude: json.article.lat,
            longitude: json.article.lon,
          }
        : null,
    };
  }

  return {
    ...json,
    ok: fetchResponse.ok,
    data: transformedarticle,
  };
}


