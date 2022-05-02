    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('./ServiceWorker.js')
        .then((reg) => console.log('Service Worker Registered', reg))
        .catch((err) => console.log('Service Worker NOT Registered', err));
    }