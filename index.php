<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/f32dfec8d8.js" crossorigin="anonymous"></script>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <link rel="icon" href="assets/images/freehand.svg">
    <link rel="stylesheet" href="assets/css/styles.css">
    <meta name="title" content="Dashboard - Ximo Romero">
    <meta name="description" content="Únete a la comunidad española de desarrolladores web y crece como programador web!">
    <meta name="keywords" content="web development, full stack developer, programmer, programming, web design">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="language" content="Spanish">
    <meta name="author" content="Ximo Romero Esteve">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ximo.rf.gd/assets/images/main_image.svg">
    <meta property="og:title" content="Dashboard - Ximo Romero">
    <meta property="og:description" content="Únete a la comunidad española de desarrolladores web y crece como programador web!">
    <meta property="og:image" content="https://ximo.rf.gd/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://ximo.rf.gd/">
    <meta property="twitter:title" content="Dashboard - Ximo Romero">
    <meta property="twitter:description" content="Únete a la comunidad española de desarrolladores web y crece como programador web!">
    <meta property="twitter:image" content="https://ximo.rf.gd/assets/images/main_image.svg">
    <link rel="canonical" href="https://ximo.rf.gd/">
    <meta name="theme-color" content="#4285f4">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KE1H6M4JGR"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-KE1H6M4JGR');
    </script>
    <title>Dashboard - Ximo Romero</title>
</head>

<body>
    <div class="loader">
        <div class="loader_text"></div>
    </div>

    <header id="header">

        <a href="index.html" class="logo"><img src="assets/images/freehand.svg" alt="Freehand" title="Freehand">freehand</a>

        <!-- <h1>Conecta, comparte y reacciona con tu gente en tu vida.</h1> -->

        <img src="assets/images/header_image.svg" alt="" loading="lazy" class="header_image">

    </header>

    <form id="formulario_registro" autocomplete="off">

        <h3>Crear una nueva cuenta</h3>

        <p>Únete a <b>freehand</b> y conecta con miles de usuarios alrededor del mundo.</p>

        <div class="form_field">

            <label for="nombre" class="form_field_title">Nombre Completo</label>

            <input type="text" id="nombre" placeholder="Escribe tu nombre completo" autocomplete="off">

        </div>

        <div class="form_field">

            <label for="email" class="form_field_title">Email</label>

            <input type="email" id="email" placeholder="Escribe tu email" autocomplete="off">

        </div>

        <div class="form_field">

            <label for="clave" class="form_field_title">Contraseña</label>

            <input type="password" id="clave" placeholder="Elige una contraseña" autocomplete="off">

            <!-- <small>Introduce al menos 4 dígitos entre mayúsculas, minusculas y números.</small> -->

        </div>

        <label class="form_field_title">Género</label>

        <div class="genero_container">

            <div class="radio_option">

                <input type="radio" name="genero" id="hombre" value="hombre">

                <label for="hombre">Hombre</label>

            </div>

            <div class="radio_option">

                <input type="radio" name="genero" id="mujer" value="mujer">

                <label for="mujer">Mujer</label>

            </div>

            <div class="radio_option">

                <input type="radio" name="genero" id="otro" value="otro">

                <label for="otro">Prefiero no decirlo</label>

            </div>

        </div>

        <small class="terminos">Creando una cuenta en esta red social, aceptas nuestros <a href="!#">Términos y

                condiciones</a> y la <a href="!#">Política de cookies.</a></small>

        <button type="button" id="registro_btn">Crear una cuenta<i class="fas fa-circle-notch"></i></button>
        <div class="google_login">
            <small class="google_login_label">O</small>

            <div id="customBtn" class="customGPlusSignIn">
                <span class="icon"><img src="assets/images/google.svg" alt=""></span>
                <span class="buttonText">Inicia sesión con Google</span>
            </div>
        </div>
        <div class="messages_container"></div>


    </form>



    <script src="assets/js/app.js"></script>
    <script>
        startApp();
    </script>
</body>



</html>