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

// 只在應用背景時觸發（前台由 onMessage 處理）
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.data?.title || 'ETF 通知';
  const notificationOptions = {
    body: payload.data?.body || '',
    icon: self.registration.scope + 'favicon.png',
    tag: 'etf-notification',
    data: { url: payload.data?.url || '/shifting' },
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 點擊通知時開啟對應頁面
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/shifting';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          client.focus();
          return client.navigate(url);
        }
      }
      return clients.openWindow(url);
    })
  );
});
