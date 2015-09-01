
// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

// self.onfetch = function(event) {
//   var req = event.request.clone();
//   console.log("SW received request for: " + req.url)
//   for (entry of req.headers.entries()) { 
//     console.log("\t" + entry[0] +": " + entry[1]) 
//   }
// }


// self.addEventListener('onfetch', function(event) { 
// 		debugger;
//  console.log("fetch registered");

// var req = event.request.clone();
// for (entry of req.headers.entries()) { 
//     console.log("\t" + entry[0] +": " + entry[1]) 
//   }
// });

self.addEventListener('fetch', function(event) {
  console.log("Caught a fetch!");
  
  var req = event.request.clone();
  var result = '';
  for (entry of req.headers.entries()) { 
    result += "\t" + entry[0] +": " + entry[1];
  }

  event.respondWith(new Response(result));
});