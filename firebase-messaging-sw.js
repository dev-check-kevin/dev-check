importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js');

// 新版本安裝後立即取代舊版本，避免兩個 SW 同時運行
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

const firebaseConfig = {
  apiKey: "AIzaSyA9CJ2FF3DUhmaZxRmKrptU10CSyi9mOfQ",
  authDomain: "etf-analysis-master.firebaseapp.com",
  projectId: "etf-analysis-master",
  storageBucket: "etf-analysis-master.firebasestorage.app",
  messagingSenderId: "447309961676",
  appId: "1:447309961676:web:5f665d92457d471350e569"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 只在應用背景時觸發（前台由 onMessage 處理）
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'ETF 通知';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.png',
    tag: 'etf-notification',
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
