var titleElement = document.getElementById("title");

async function getData() {
    const response = await fetch("/session/data");
    return response.json()
}

getData().then(function(result) {
    if (result.message !== "OK") {
        return;
    } else {
        titleElement.innerHTML = "Welcome back, " + result.username;
    }
});