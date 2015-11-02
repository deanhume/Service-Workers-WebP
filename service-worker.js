"use strict";

// Listen to fetch events
self.addEventListener('fetch', function(event) {

	// Clone the request
	var req = event.request.clone();

  	// Check if the image is a jpeg
  	if (/\.jpg$|.png$/.test(event.request.url)) {

  		// Get all of the headers
  		let headers = Array.from(req.headers.entries());

  		// Inspect the accept header for WebP support
  		var acceptHeader = headers.find(item => item[0] == 'accept');
  		var supportsWebp = acceptHeader[1].includes('webp');

  		// Inspect the headers for DPR
  		var dprHeader = headers.find(item => item[0] == 'dpr');
  		var dpr = dprHeader[1];

  		// If we support WebP and have a high DPR
  		var returnUrl;
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