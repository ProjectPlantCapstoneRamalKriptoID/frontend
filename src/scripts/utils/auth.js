import { getActiveRoute } from "../routes/url-parser";
import { ACCESS_TOKEN_KEY } from "../config";

export function getAccessToken() {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken === "null" || accessToken === "undefined") {
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error("getAccessToken: error:", error);
    return null;
  }
}

export function putAccessToken(token) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error("putAccessToken: error:", error);
    return false;
  }
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error("getLogout: error:", error);
    return false;
  }
}

const unauthenticatedRoutesOnly = ["/login", "/register"];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getAccessToken();

 if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    console.log("User already logged in, redirecting to home");
    // Use setTimeout to avoid blocking the current execution
    setTimeout(() => {
      location.hash = "/";
    }, 0);
    return null;
  }

  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getAccessToken();
const url = getActiveRoute();

  console.log("checkAuthenticatedRoute:", { url, isLogin });

  if (!isLogin) {
    console.log("User not authenticated, redirecting to login");
    // Use setTimeout to avoid blocking the current execution
    setTimeout(() => {
      location.hash = '/login';
    }, 0);
    return null;
  }

  return page;
}
export function getLogout() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem("accessToken"); 
    return true;
  } catch (error) {
    console.error("getLogout: error:", error);
    return false;
  }
}
