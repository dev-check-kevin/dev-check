importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js');

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

messaging.onBackgroundMessage((payload) => {
  console.log('[SW] Message received:', payload);
  const notificationTitle = payload.notification?.title || 'ETF 通知';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/favicon.png',
    badge: '/favicon.png',
    tag: 'etf-notification',
    requireInteraction: false,
  };
  console.log('[SW] Showing notification:', notificationTitle, notificationOptions);
  return self.registration.showNotification(notificationTitle, notificationOptions).catch(err => {
    console.error('[SW] showNotification failed:', err);
  });
});
