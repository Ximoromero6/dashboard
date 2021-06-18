const URL = "assets/php/app.php";

(function() {
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none";
        document.body.style.overflow = "initial";
    }, Math.floor(Math.random() * 500 + 1000));
})();

function ajaxRequest(url, method, data = "") {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();

        request.open(method, url, true);

        request.onload = function() {
            (request.readyState == 4 && request.status == 200) ? resolve(request.response): reject(Error(request.statusText));
        };

        request.onerror = function() {
            reject(Error("Network error"));
        };

        request.setRequestHeader("Content-Type", "application/json");

        request.send(data);
    });
}

function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email.value).toLowerCase());
}

function validatePassword(password) {
    let password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;
    return password.value.match(password_regex) ? true : false;
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log("User signed out.");
        /* window.location.href = window.location.hostname; */
    });
}

function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function(googleUser) {
            let profile = googleUser.getBasicProfile();

            let data = {
                "id": profile.getId(),
                "name": profile.getName(),
                "image_url": profile.getImageUrl(),
                "email": profile.getEmail(),
                "google_account": 1
            };

            if (profile) {
                document.querySelector("#formulario_registro").innerHTML = `
                <div>
                    <a href="#" onclick="${signOut()}">Cerrar sesión</a>
                </div>
            `;
            } else {
                ajaxRequest(URL, "POST", window.btoa(JSON.stringify(data))).then(function(response) {
                    console.log(JSON.parse(response));
                    if (JSON.parse(response).code) {
                        document.querySelector("#formulario_registro").innerHTML = `
                                            <div>
                                                <h2>Nombre: ${data.name}</h2>
                                                Imagen: <img src='${data.image_url}' width='60'>
                                                <p>Email: ${data.email}</p>
                                            </div>
                                        `;
                    }
                }, function(error) {
                    console.error("Failed!", error);
                });
            }
        },
        function(error) {
            console.log(JSON.stringify(error, undefined, 2));
        });
}

var googleUser = {};
var startApp = function() {
    gapi.load("auth2", function() {
        auth2 = gapi.auth2.init({
            client_id: "926809456675-l4hf33i6q4eqnva0p1j73and1ugl6mgg.apps.googleusercontent.com",
            cookiepolicy: "single_host_origin",
        });
        if (auth2.isSignedIn.get()) {
            document.querySelector("#formulario_registro").innerHTML = `
                    <div>
                        <a href="#" onclick="${signOut()}">Cerrar sesión</a>
                    </div>
                `;
        } else {
            attachSignin(document.getElementById("customBtn"));
        }
    });
};

let messages_container = document.querySelector(".messages_container"),
    error_messages = new Array();

document.querySelector("#registro_btn").addEventListener("click", (e) => {
    e.target.classList.add("loading", "disabled");
    e.target.disabled = true;

    let name = document.querySelector("#nombre"),
        email = document.querySelector("#email"),
        clave = document.querySelector("#clave"),
        genero = "",
        radio_buttons = document.getElementsByName("genero"),
        valid = false,
        random_wait = Math.floor(Math.random() * 2000 + 500);

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
                error_messages.push("Formato de contraseña incorrecto.");
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
            error_messages.push("Por favor, introduce un género.");
        }

        if (error_messages.length > 0) {
            messages_container.innerHTML = "";
            messages_container.className = "messages_container invalid";

            error_messages.forEach((error) => {
                messages_container.innerHTML += `<small><li>${error}</li></small>`;
            });
            error_messages.length = 0;
        } else {

            let data = {
                "name": name.value,
                "email": email.value,
                "password": clave.value,
                "gender": genero,
                "google_account": 0
            };

            ajaxRequest(URL, "POST", window.btoa(JSON.stringify(data))).then(function(response) {
                let decoded_reponse = JSON.parse(response);

                if (decoded_reponse.code) {
                    messages_container.className = "messages_container valid";
                    document.getElementById("formulario_registro").reset();
                } else messages_container.className = "messages_container invalid";

                messages_container.innerHTML = `<small><li>${decoded_reponse.message}</li></small>`;
            }, function(error) {
                console.error("Failed!", error);
            });
        }
    }, random_wait);
});