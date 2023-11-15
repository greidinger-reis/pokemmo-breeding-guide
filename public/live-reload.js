let reloadTimeout;
(function () {
let socket = new WebSocket("ws://localhost:3001/ws");

socket.onopen = function(e) {
	console.log("connected")
};


socket.onmessage = function(event) {
	console.log("event", event.data)
	// Clear any existing reload timeout
	clearTimeout(reloadTimeout);

	// Set a new reload timeout
	reloadTimeout = setTimeout(() => {
	location.reload();
	}, 100);  // 50ms debounce time
};

socket.onclose = function(event) {
	console.log("closed");
};

socket.onerror = function(error) {
	console.log("error: " + error.message);
};
})();