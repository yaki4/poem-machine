importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/708fb201d1f9b7bbb742.js",
    "revision": "7698438479e9966f105674578d393b52"
  },
  {
    "url": "/_nuxt/7b49402777741d9479a8.js",
    "revision": "0c7c4065c46e547fb794cbc7475504b2"
  },
  {
    "url": "/_nuxt/9059f7f8020a95b1a8f5.js",
    "revision": "f31312b2316eddc7343527278366e1cf"
  },
  {
    "url": "/_nuxt/b7a48e4e6d4eb0dd4af2.js",
    "revision": "32b971653b3bdf7e02c249adbafbb164"
  },
  {
    "url": "/_nuxt/bae65b534d092b3d70f3.js",
    "revision": "13100095baf076e2cc739de72ad98569"
  },
  {
    "url": "/_nuxt/e8ea56bd2fc6acb4fec8.js",
    "revision": "3e25a81c83ecffdfb072484b59d6657a"
  }
], {
  "cacheId": "poem-machine",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
