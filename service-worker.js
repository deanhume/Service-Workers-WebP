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

  		var dpr = 1;
  		var supportsWebp = false;

		// Check the headers
		for (entry of req.headers.entries()) { 
			
			// Check the accept header
			if (entry[0].toLowerCase() == 'accept' && entry[1].toLowerCase().includes('webp'))
			{
				supportsWebp = true;
			}

			// Check the client hints header
			if (entry[0].toLowerCase() == 'dpr')
			{
				dpr = 2;
			}
		}

		if (supportsWebp)
		{
			var returnUrl;

			// If we have a high DPR then change path
			if (dpr > 1)
			{
				returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + "-" + dpr + "x.webp";
			}
			else{
				// Just return the normal webp url
				returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + ".webp";
			}

			console.log(returnUrl);

			event.respondWith(
				fetch(returnUrl, {
					mode: 'no-cors'
				})
			);
		}
	}
});