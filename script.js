(function () {
    const btn = document.querySelector("#btn1");
    const div = document.querySelector("#res-table");
    const select = document.querySelector("#endpoint");

    btn.addEventListener("click", () => {
        div.innerHTML = "Loading...";
        fetch(`/${select.value}`)
            .then((response) => response.json())
            .then((data) => {
                const columns = Object.keys(data.results[0]);
                let html = "<table><tr>";
                columns.forEach((col) => {
                    html += `<th>${col}</th>`;
                });
                html += "</tr>";

                data.results.forEach((row) => {
                    html += "<tr>";
                    columns.forEach((col) => {
                        html += `<td>${row[col]}</td>`;
                    });
                    html += "</tr>";
                });

                html += "</table>";
                div.innerHTML = html;
            })
            .catch((error) => {
                div.textContent = `Blad ${error}`;
            });
    });
})();
