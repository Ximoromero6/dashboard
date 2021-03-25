document.querySelector("#registro_btn").addEventListener("click", (e) => {
    e.target.classList.add("loading");
    setTimeout(() => {
        e.target.classList.remove("loading");
    }, 2000);
});