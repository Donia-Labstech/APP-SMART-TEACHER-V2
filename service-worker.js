// Service Worker بسيط لـ DONIA SMART TEACHER
// الهدف الأساسي: تحقيق شرط "Service Worker مسجَّل" الذي يتطلبه Chrome
// لإظهار زر تثبيت التطبيق (PWA) — لا يقوم بتخزين مؤقت معقّد حاليًا.

const CACHE_NAME = 'donia-smart-teacher-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// يمرّر كل الطلبات مباشرة للشبكة (بدون تخزين مؤقت يمنع وصول التحديثات الجديدة)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
