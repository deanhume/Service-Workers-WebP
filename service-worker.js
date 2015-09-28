
// Register the service worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
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
  	if (/\.jpg$/.test(event.request.url)) {

		// Check the headers
		for (entry of req.headers.entries()) { 
			// Check the accept header
			if (entry[0] == 'accept')
			{
				if (entry[1].includes('webp'))
				{
					// change the return path
					var returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + ".webp";

					event.respondWith(
						fetch(returnUrl, {
							mode: 'no-cors'
						})
					);
				}
			}
		}
	}
});