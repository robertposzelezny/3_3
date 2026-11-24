(function () {
    const btn = document.querySelector("#btn1");
    const div = document.querySelector("#result");
    const apiKey = "Il7SBonnd7HPsgq4VBArPy0qH9XRNXnx";

    btn.addEventListener("click", () => {
        div.innerHTML = "Loading...";
        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&rating=g`)
            .then((response) => response.json())
            .then((data) => {
                const gif = data.data;
                div.innerHTML = `<p>${gif.title}</p>
                    <img src="${gif.images.original.url}">
                `;
            })
            .catch((error) => {
                div.textContent = `Blad ${error}`;
            });
    });
})();
