import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail, 
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuración de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyC2BSFYZBvIF7cxUr7xUvZKmlhg0ACk504",
    authDomain: "tp-js-48675.firebaseapp.com",
    databaseURL: "https://tp-js-48675-default-rtdb.firebaseio.com",
    projectId: "tp-js-48675",
    storageBucket: "tp-js-48675.firebasestorage.app",
    messagingSenderId: "930594601481",
    appId: "1:930594601481:web:d67813a0ffdd977144d6d8",
    measurementId: "G-GN0C2S2GSS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

/* ==========================
    REGISTRO
========================== */
const btnRegister = document.getElementById("buttonregister");
if (btnRegister) {
    btnRegister.addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;
        const telefono = document.getElementById("phone").value

        const recaptchaResponse = grecaptcha.getResponse();

        if (recaptchaResponse.length === 0) {
            alert("Por favor, verifica que no eres un robot.");
            return;
        }

        if (password !== password2) {
            alert("Las contraseñas no coinciden");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log("Intentando guardar datos en la base de datos…");

                // 📦 Guardar datos en Realtime Database
                set(ref(db, "usuarios/" + user.uid), {
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    telefono: telefono,
                    creadoEl: new Date().toISOString()
                })
                .then(() => {
                    console.log("✅ Datos guardados correctamente en la BD");
                    alert("Usuario creado con éxito");
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    console.error("❌ Error al guardar en la BD:", error);
                });
                
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}


/* ==========================
    LOGIN
========================== */
const btnLogin = document.getElementById("buttonlogin");
if (btnLogin) {
    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const recaptchaResponse = grecaptcha.getResponse();

        if (recaptchaResponse.length === 0) {
            alert("Por favor, verifica que no eres un robot.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                window.location.href = "../principal.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
            });
    });
}


    /* ==========================
        FORGOT PASSWORD
    ========================== */
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;

            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Hemos enviado un correo para restablecer tu contraseña.");
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
        });
    }


    /* ==========================
        LOGOUT Y VISIBILIDAD
    ========================== */

    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutLink = document.getElementById("logout-link");

    const loginItem = loginLink ? loginLink.parentElement : null;
    const registerItem = registerLink ? registerLink.parentElement : null;
    const logoutItem = logoutLink ? logoutLink.parentElement : null;

    onAuthStateChanged(auth, (user) => {
        if (loginItem && logoutItem) {
            if (user) {
                loginItem.style.display = "none";
                logoutItem.style.display = "flex";
            } else {
                loginItem.style.display = "flex";
                logoutItem.style.display = "none";
            }
        }

        if (registerItem) {
            registerItem.style.display = "none";
        }
    });

    if (logoutLink) {
        logoutLink.addEventListener("click", (e) => {
            e.preventDefault();

            signOut(auth)
                .then(() => {
                    alert("Sesión cerrada.");
                    window.location.href = "../index.html";
                })
                .catch((error) => {
                    console.error("Error al cerrar sesión:", error);
                    alert("Hubo un error al cerrar la sesión.");
                });
        });
    }


