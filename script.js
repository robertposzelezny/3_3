(function () {
    const btn = document.querySelector("#btn1");
    const btn2 = document.querySelector("#btn2");
    const phrase = document.querySelector("#phrase");
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

    btn2.addEventListener("click", () => {
        div.innerHTML = "Loading...";
        fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(phrase.value)}&rating=g`,
        )
            .then((response) => response.json())
            .then((data) => {
                let html = "";
                data.data.forEach((gif) => {
                    html += `<img src="${gif.images.fixed_height.url}">`;
                });
                div.innerHTML = html;
            })
            .catch((error) => {
                div.textContent = `Blad ${error}`;
            });
    });
})();
