// src\scripts\sw.js
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";
import { BASE_URL } from "./config";

// Do precaching
const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);

// Runtime caching
registerRoute(
  ({ url }) => {
    return (
      url.origin === "https://fonts.googleapis.com" ||
      url.origin === "https://fonts.gstatic.com"
    );
  },
  new CacheFirst({
    cacheName: "google-fonts",
  })
);

registerRoute(
  ({ url }) => {
    return (
      url.origin === "https://cdnjs.cloudflare.com" ||
      url.origin.includes("fontawesome")
    );
  },
  new CacheFirst({
    cacheName: "fontawesome",
  })
);

registerRoute(
  ({ url }) => {
    return url.origin === "https://ui-avatars.com";
  },
  new CacheFirst({
    cacheName: "avatars-api",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request, url }) => {
    const baseUrl = new URL(BASE_URL);
    return baseUrl.origin === url.origin && request.destination !== "image";
  },
  new NetworkFirst({
    cacheName: "ramalkripto-api",
  })
);

registerRoute(
  ({ request, url }) => {
    const baseUrl = new URL(BASE_URL);
    return baseUrl.origin === url.origin && request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "ramalkripto-api-images",
  })
);


// Push notification event handler
self.addEventListener("push", (event) => {
  console.log("[Service worker] pushing...");

  async function chainPromise() {
    const data = await event.data.json();
    await self.registration.showNotification(data.title, {
      body: data.options.body,
    });
  }

  event.waitUntil(chainPromise());
});
