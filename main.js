import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const addProductForm = document.getElementById('addProductForm');
const productosList = document.getElementById('productosList');

addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreProducto').value;
    const descripcion = document.getElementById('descripcionProducto').value;
    const precio = document.getElementById('precioProducto').value;
    const imagen = document.getElementById('imagenProducto').value;

    push(ref(db, 'productos'), {
        nombre,
        descripcion,
        precio,
        imagen
    });

    addProductForm.reset();
});

onValue(ref(db, 'productos'), (snapshot) => {
    productosList.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
        const producto = childSnapshot.val();
        const key = childSnapshot.key;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
            <td>
                <button onclick="borrarProducto('${key}')">Borrar</button>
                <button onclick="editarProducto('${key}')">Editar</button>
            </td>
        `;
        productosList.appendChild(row);
    });
});

window.borrarProducto = (key) => {
    remove(ref(db, `productos/${key}`));
};

window.editarProducto = (key) => {
    const newNombre = prompt('Nuevo nombre:');
    const newDescripcion = prompt('Nueva descripción:');
    const newPrecio = prompt('Nuevo precio:');
    const newImagen = prompt('Nueva URL de imagen:');

    if (newNombre && newDescripcion && newPrecio && newImagen) {
        update(ref(db, `productos/${key}`), {
            nombre: newNombre,
            descripcion: newDescripcion,
            precio: newPrecio,
            imagen: newImagen
        });
    }
};
