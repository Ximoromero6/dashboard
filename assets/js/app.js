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
    e.target.classList.add("loading", "disabled");
    e.target.disabled = true;

    let name = document.querySelector("#nombre"),
        email = document.querySelector("#email"),
        clave = document.querySelector("#clave"),
        genero = "",
        radio_buttons = document.getElementsByName("genero"),
        valid = false;

    if (name.value == "" || email.value == "" || clave.value == "") {
        error_messages.push("Por favor, rellena los campos en rojo.");
    }

    setTimeout(() => {
        e.target.classList.remove("loading", "disabled");
        e.target.disabled = false;

        if (name.value == "")
            name.classList.add("error")
        else {
            name.classList.remove("error");
        }

        if (email.value == "")
            email.classList.add("error")
        else {
            email.classList.remove("error");
            if (!validateEmail(email)) {
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

        for (let i = 0; i < radio_buttons.length; i++) {
            if (radio_buttons[i].checked) {
                valid = true;
                genero = radio_buttons[i].value;
                break;
            } else {
                valid = false;
            }
        }

        if (!valid) {
            error_messages.push("Por favor, introduce un género");
        }

        if (error_messages.length > 0) {
            errors_container.style.display = "flex";
            errors_container.innerHTML = "";

            error_messages.forEach((error) => {
                errors_container.innerHTML += `<small><li>${error}</li></small>`;
            });
            error_messages.length = 0;
        } else {
            errors_container.innerHTML = "";
            errors_container.style.display = "none";

            let data = {
                "name": name.value,
                "email": email.value,
                "password": clave.value,
                "gender": genero
            };
            console.log("CORRECTO " + JSON.stringify(data));
        }
    }, 2000);
});