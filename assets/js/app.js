function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email.value).toLowerCase());
}

function validatePassword(password) {
    let password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
    return password.value.match(password_regex) ? true : false;
}


let errors_container = document.querySelector(".errors_container"),
    error_messages = new Array();

document.querySelector("#registro_btn").addEventListener("click", (e) => {
    e.target.classList.add("loading");

    let name = document.querySelector("#nombre"),
        email = document.querySelector("#email"),
        clave = document.querySelector("#clave");

    //Comprobamos cada campo
    if (name.value == "" || email.value == "" || clave.value == "") {
        error_messages.push("Por favor, rellena los campos en rojo.");
        console.log(this);
    }

    setTimeout(() => {
        e.target.classList.remove("loading");

        if (name.value == "")
            name.classList.add("error")
        else {
            name.classList.remove("error");
        }

        if (email.value == "")
            email.classList.add("error")
        else {
            email.classList.remove("error");
            console.log(validateEmail(email));
            if (!validateEmail(email.value)) {
                error_messages.push("Formato de email incorrecto. Ej: email@dominio.com");
            }
        }

        if (clave.value == "")
            clave.classList.add("error")
        else {
            clave.classList.remove("error");
            if (!validatePassword(clave)) {
                error_messages.push("Formato de contraseña incorrecto");
            }
        }

        if (error_messages.length > 0) {
            errors_container.style.display = "flex";
            errors_container.innerHTML = "";

            error_messages.forEach((error) => {
                errors_container.innerHTML += `<small><li>${error}</li></small>`;
            });
            error_messages.length = 0;
        } else {
            console.log("CORRECTO");
        }
    }, 2000);
});