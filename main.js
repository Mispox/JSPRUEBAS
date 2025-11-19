var btnAgregar = document.querySelector('#btnAgregar');
var btnEliminar = document.querySelector('#btnEliminar');
var btnBuscar = document.querySelector('#btnBuscar');
var btnLimpiar = document.querySelector('#btnLimpiar');
var cboxInsertar = document.querySelector('#cboxInsertar');
var table = document.getElementById('lista');
var tableinvertida = document.getElementById('listainvertida');
var tableactividad = document.getElementById('actividad');
var lista = new Array;
class Articulo {
    constructor(codigo, nombre, descripcion, cantidad, costo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.costo = costo;
        this.total = (cantidad * costo);
    }
    añadir(elemento) {
        lista.push(elemento);
    }
    insertar(elemento) {
        let casilla = document.querySelector('#casilla');
        lista.splice((casilla.value - 1), 0, elemento);
    }
}
cboxInsertar.addEventListener('click', () => {
    if (cboxInsertar.checked == true) {
        let divinsertar = document.getElementById('divinsertar');
        divinsertar.innerHTML = '<input name="casilla" type="number" placeholder="Casilla" id="casilla" />';
    } else if (cboxInsertar.checked == false) {
        let casilla = document.querySelector('#casilla');
        casilla.remove();
    }
});
btnAgregar.addEventListener('click', () => {
    console.clear();
    console.log('Se oprimió el botón Agregar');
    if (lista.length < 20) {
        let codigo = document.querySelector('#codigo');
        let nombre = document.querySelector('#nombre');
        let descripcion = document.querySelector('#descripcion');
        let cantidad = document.querySelector('#cantidad');
        let costo = document.querySelector('#costo');
        let casilla = document.querySelector('#casilla');
        var check = undefined;
        for (let i = 0; i <= lista.length; i++) {
            if (lista[i]) {
                if (codigo.value == lista[i].codigo) {
                    check = false;
                    console.log(lista);
                    return alert('🚫 No puedes añadir varios productos con el mismo código 🚫');
                } else {
                    check = true;
                }
            } else {
                check = true;
            }
        }
        if (check == true) {
            let articulo = new Articulo(codigo.value, nombre.value, descripcion.value, cantidad.value, costo.value);
            if (articulo.codigo && articulo.nombre && articulo.descripcion && articulo.cantidad && articulo.costo) {
                table.innerHTML = '';
                tableinvertida.innerHTML = '';
                let cabecera1 = table.insertRow(-1);
                let titulo11 = cabecera1.insertCell(0);
                let titulo12 = cabecera1.insertCell(1);
                titulo11.textContent = 'Código';
                titulo12.textContent = 'Nombre';
                let cabecera2 = tableinvertida.insertRow(-1);
                let titulo21 = cabecera2.insertCell(0);
                let titulo22 = cabecera2.insertCell(1);
                titulo21.textContent = 'Código';
                titulo22.textContent = 'Nombre';
                if (casilla) {
                    if (casilla.value.length == 0) {
                        alert('💤 Olvidaste ingresar la casilla específica 💤');
                    } else if ((casilla.value - 1) < lista.length) {
                        articulo.insertar(articulo);
                        let fila = tableactividad.insertRow(-1);
                        let celda1 = fila.insertCell(0);
                        let celda2 = fila.insertCell(1);
                        let celda3 = fila.insertCell(2);
                        celda1.textContent = 'Insertar';
                        celda2.textContent = articulo.codigo;
                        celda3.textContent = articulo.nombre;
                    } else {
                        console.log(lista);
                        alert('🚫 No puedes insertar en el último artículo, por encima del mismo o si la lista esta vacía 🚫');
                    }
                } else {
                    articulo.añadir(articulo);
                    let fila = tableactividad.insertRow(-1);
                    let celda1 = fila.insertCell(0);
                    let celda2 = fila.insertCell(1);
                    let celda3 = fila.insertCell(2);
                    celda1.textContent = 'Agregar';
                    celda2.textContent = articulo.codigo;
                    celda3.textContent = articulo.nombre;
                }
                console.log(lista);
                for (let i = 0; i < lista.length; i++) {
                    let fila = table.insertRow(-1);
                    let celda1 = fila.insertCell(0);
                    let celda2 = fila.insertCell(1);
                    celda1.textContent = lista[i].codigo;
                    celda2.textContent = lista[i].nombre;
                }
                for (let i = (lista.length - 1); i >= 0; i--) {
                    let fila = tableinvertida.insertRow(-1);
                    let celda1 = fila.insertCell(0);
                    let celda2 = fila.insertCell(1);
                    celda1.textContent = lista[i].codigo;
                    celda2.textContent = lista[i].nombre;
                }
            } else {
                alert('📄 Llena todos los espacios 📄');
                if (lista.length > 0) {
                    console.log(lista);
                }
            }
        }
    } else {
        alert('📟 Se ha llegado al limite de registros | 20 máximo 📟');
        if (lista.length > 0) {
            console.log(lista);
        }
    }
});
btnEliminar.addEventListener('click', () => {
    console.clear();
    console.log('Se oprimió el botón Eliminar');
    let codigo = document.querySelector('#codigo');
    if (codigo.value) {
        for (let i = 0; i <= lista.length; i++) {
            if (lista[i]) {
                if (lista[i].codigo == codigo.value) {
                    let fila = tableactividad.insertRow(-1);
                    let celda1 = fila.insertCell(0);
                    let celda2 = fila.insertCell(1);
                    let celda3 = fila.insertCell(2);
                    celda1.textContent = 'Eliminar';
                    celda2.textContent = lista[i].codigo;
                    celda3.textContent = lista[i].nombre;
                    table.innerHTML = '';
                    tableinvertida.innerHTML = '';
                    lista.splice(i, 1);
                    let cabecera1 = table.insertRow(-1);
                    let titulo11 = cabecera1.insertCell(0);
                    let titulo12 = cabecera1.insertCell(1);
                    titulo11.textContent = 'Código';
                    titulo12.textContent = 'Nombre';
                    let cabecera2 = tableinvertida.insertRow(-1);
                    let titulo21 = cabecera2.insertCell(0);
                    let titulo22 = cabecera2.insertCell(1);
                    titulo21.textContent = 'Código';
                    titulo22.textContent = 'Nombre';
                    alert('🗑 Artículo eliminado 🗑');
                    for (let i = 0; i < lista.length; i++) {
                        let fila = table.insertRow(-1);
                        let celda1 = fila.insertCell(0);
                        let celda2 = fila.insertCell(1);
                        celda1.textContent = lista[i].codigo;
                        celda2.textContent = lista[i].nombre;
                    }
                    for (let i = (lista.length - 1); i >= 0; i--) {
                        let fila = tableinvertida.insertRow(-1);
                        let celda1 = fila.insertCell(0);
                        let celda2 = fila.insertCell(1);
                        celda1.textContent = lista[i].codigo;
                        celda2.textContent = lista[i].nombre;
                    }
                    if (lista.length > 0) {
                        console.log(lista);
                    } else {
                        alert('🌀 Sin artículos restantes 🌀');
                        console.log('Sin artículos restantes');
                    }
                    //Posible solución al problema
                    return;
                }
            } else {
                alert('❔ Artículo no encontrado ❔');
                if (lista.length > 0) {
                    console.log(lista);
                }
            }
        }
    } else {
        alert('📄 Ingresa el código del artículo a eliminar 📄');
        if (lista.length > 0) {
            console.log(lista);
        }
    }
});
btnBuscar.addEventListener('click', () => {
    console.clear();
    console.log('Se oprimió el botón Buscar');
    let table = document.querySelector("#infoarticulo");
    let codigo = document.querySelector('#codigo');
    if (codigo.value) {
        for (let i = 0; i <= lista.length; i++) {
            if (lista[i]) {
                if (lista[i].codigo == codigo.value) {
                    let fila = tableactividad.insertRow(-1);
                    let celda1 = fila.insertCell(0);
                    let celda2 = fila.insertCell(1);
                    let celda3 = fila.insertCell(2);
                    celda1.textContent = 'Buscar';
                    celda2.textContent = lista[i].codigo;
                    celda3.textContent = lista[i].nombre;
                    let tablecodigo = document.getElementById('tablecodigo');
                    let tablenombre = document.getElementById('tablenombre');
                    let tabledescripcion = document.getElementById('tabledescripcion');
                    let tablecantidad = document.getElementById('tablecantidad');
                    let tablecosto = document.getElementById('tablecosto');
                    let tabletotal = document.getElementById('tabletotal');
                    tablecodigo.innerText = lista[i].codigo;
                    tablenombre.innerText = lista[i].nombre;
                    tabledescripcion.innerText = lista[i].descripcion;
                    tablecantidad.innerText = lista[i].cantidad;
                    tablecosto.innerText = lista[i].costo;
                    tabletotal.innerText = lista[i].total;
                    if (lista.length > 0) {
                        console.log(lista);
                    }
                    //Posible solución al problema
                    return;
                }
            } else {
                alert('❔ Artículo no encontrado ❔');
                if (lista.length > 0) {
                    console.log(lista);
                }
            }
        }
    } else {
        alert('🔎 Ingresa el código del artículo a buscar 🔎');
        if (lista.length > 0) {
            console.log(lista);
        }
    }
});
btnLimpiar.addEventListener('click', () => {
    let codigo = document.querySelector('#codigo');
    let nombre = document.querySelector('#nombre');
    let descripcion = document.querySelector('#descripcion');
    let cantidad = document.querySelector('#cantidad');
    let costo = document.querySelector('#costo');
    codigo.value = '';
    nombre.value = '';
    descripcion.value = '';
    cantidad.value = '';
    costo.value = '';
    cboxInsertar.checked = false;
    let casilla = document.querySelector('#casilla');
    if (casilla) {
        casilla.remove();
    }
});
