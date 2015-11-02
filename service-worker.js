"use strict";

// Register the service worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
}).catch(function(err) {
    // registration failed :(
    	console.log('ServiceWorker registration failed: ', err);
    });
}

// Listen to fetch events
self.addEventListener('fetch', function(event) {

	// Clone the request
	var req = event.request.clone();

  	// Check if the image is a jpeg
  	if (/\.jpg$|.png$/.test(event.request.url)) {

  		// Get all of the headers
  		let headers = Array.from(req.headers.entries());

  		// Inspect the accept header for WebP support
  		var acceptHeader = headers.find(item => item == 'accept');
  		var supportsWebp = acceptHeader.includes('webp');

  		// Inspect the headers for DPR
  		var dpr = headers.find(item => item == 'dpr');

  		// If we support WebP and have a high DPR
  		if (supportsWebp && dpr > 1)
  		{
  			returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + "-" + dpr + "x.webp";
  		}

  		// Else if we only support WebP
  		if (supportsWebp)
  		{
			returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + ".webp";
		}

		event.respondWith(
			fetch(returnUrl, {
				mode: 'no-cors'
			})
		);
	}
});