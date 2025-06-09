// src\scripts\data\api.js

import { BASE_URL, API_KEY } from "../config";

const ENDPOINTS = {
  // Articles
  ARTICLES_LIST: `${BASE_URL}/article/list`,
};

export async function getAllArticles(page = 1, limit = 12) {
  try {
    const url = new URL(ENDPOINTS.ARTICLES_LIST);
    url.searchParams.append("limit", limit);
    url.searchParams.append("apikey", API_KEY);

    if (page > 1) {
      url.searchParams.append("page", page);
    }

    const fetchResponse = await fetch(url.toString(), {
      headers: { "Content-Type": "application/json" },
    });

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const json = await fetchResponse.json();
    console.log("getAllArticles response:", json);

    return {
      success: fetchResponse.ok,
      ok: fetchResponse.ok,
      data: json.Data || [],
      message: json.message || "Data fetched successfully",
      total: json.total || (json.Data ? json.Data.length : 0),
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      success: false,
      ok: false,
      data: [],
      message: error.message || "Failed to fetch articles",
      total: 0,
    };
  }
}
export async function getArticle(page = 1, limit = 6) {
  try {
    const url = new URL(ENDPOINTS.ARTICLES_LIST);
    url.searchParams.append("limit", limit);
    url.searchParams.append("apikey", API_KEY);

    if (page > 1) {
      url.searchParams.append("page", page);
    }

    const fetchResponse = await fetch(url.toString(), {
      headers: { "Content-Type": "application/json" },
    });

    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! status: ${fetchResponse.status}`);
    }

    const json = await fetchResponse.json();
    console.log("getAllArticles response:", json);

    return {
      success: fetchResponse.ok,
      ok: fetchResponse.ok,
      data: json.Data || [],
      message: json.message || "Data fetched successfully",
      total: json.total || (json.Data ? json.Data.length : 0),
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      success: false,
      ok: false,
      data: [],
      message: error.message || "Failed to fetch articles",
      total: 0,
    };
  }
}
