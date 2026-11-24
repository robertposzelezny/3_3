(function () {
    const btn = document.querySelector("#btn1");
    const btn2 = document.querySelector("#btn2");
    const phrase = document.querySelector("#phrase");
    const prev = document.querySelector("#prev");
    const next = document.querySelector("#next");
    const pageInfo = document.querySelector("#page-info");
    const pager = document.querySelector("#pager");
    const div = document.querySelector("#result");
    const apiKey = "Il7SBonnd7HPsgq4VBArPy0qH9XRNXnx";

    const perPage = 10;
    let page = 1;
    let total = 1;

    pager.style.display = "none";

    function search() {
        div.innerHTML = "Loading...";
        const offset = (page - 1) * perPage;

        fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(phrase.value)}&rating=g&limit=${perPage}&offset=${offset}`,
        )
            .then((response) => response.json())
            .then((data) => {
                if (!data.data || data.data.length === 0) {
                    pager.style.display = "none";
                    return;
                }

                let html = "";
                data.data.forEach((gif) => {
                    html += `<img src="${gif.images.fixed_height.url}">`;
                });
                div.innerHTML = html;

                total = Math.ceil(data.pagination.total_count / perPage);
                pageInfo.textContent = `Strona ${page} z ${total}`;
                prev.disabled = page <= 1;
                next.disabled = page >= total;
                pager.style.display = "block";
            })
            .catch((error) => {
                div.textContent = `Blad ${error}`;
            });
    }

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
        page = 1;
        search();
    });

    prev.addEventListener("click", () => {
        page -= 1;
        search();
    });
    next.addEventListener("click", () => {
        page += 1;
        search();
    });
})();
