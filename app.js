// Variables para almacenar las imágenes del muñeco y del mensaje
const imagenMuñeco = document.querySelector('#Muñeco_');
const imagenMensaje = document.querySelector('#Mensaje_');

// Ocultar imágenes al cargar la página si el textarea tiene texto
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('.textarea').value.trim();
    if (textarea !== '') {
        imagenMuñeco.classList.add('ocultar');
        imagenMensaje.classList.add('ocultar');
    }
});

// Diccionario de encriptación
const diccionarioEncriptacion = {
    'a': 'xYz1',
    'e': 'qRt2',
    'i': 'uVc3',
    'o': 'pLm4',
    'u': 'tNz5'
};

// Diccionario de desencriptación
const diccionarioDesencriptacion = Object.fromEntries(
    Object.entries(diccionarioEncriptacion).map(([key, value]) => [value, key])
);

let textoOriginal = '';

// Función para encriptar el texto
function Encriptar() {
    const textarea = document.querySelector('.textarea');
    const texto = textarea.value.trim();

    if (texto === '') {
        imagenMuñeco.classList.remove('ocultar');
        imagenMensaje.classList.remove('ocultar');
        return;
    }

    imagenMuñeco.classList.add('ocultar');
    imagenMensaje.classList.add('ocultar');

    textoOriginal = texto;

    const textoEncriptado = texto.split('').map(caracter => {
        return diccionarioEncriptacion[caracter] || caracter;
    }).join('');

    const rectangleTextarea = document.querySelector('.rectangle_Textarea');
    rectangleTextarea.value = textoEncriptado;

    document.getElementById('Desencriptar-btn').disabled = false;
    const copiarBtn = document.getElementById('Copiar-btn');
    copiarBtn.disabled = false;
    copiarBtn.style.display = 'block';
}


// Función para desencriptar el texto
function Desencriptar() {
    // Obtener el texto del textarea dentro del rectángulo
    const textareaRectangulo = document.querySelector('.rectangle_Textarea');
    const textoEncriptado = textareaRectangulo.value.trim();

    // Verificar si el textarea dentro del rectángulo está vacío
    if (textoEncriptado === '') {
        alert('El área de texto dentro del rectángulo está vacío. No hay nada que desencriptar.');
        return; // Salir de la función si el textarea dentro del rectángulo está vacío
    }

    // Crear una expresión regular para todas las secuencias de encriptación
    const regex = new RegExp(Object.keys(diccionarioDesencriptacion).join('|'), 'g');

    // Desencriptar el texto reemplazando secuencias con letras originales
    const textoDesencriptado = textoEncriptado.replace(regex, match => {
        return diccionarioDesencriptacion[match] || match; // Usa el valor del diccionario o deja el texto como está
    });

    // Mostrar el texto desencriptado en el textarea dentro del rectángulo
    textareaRectangulo.value = textoDesencriptado;

    // Desactivar el botón de desencriptar después de usarlo
    document.getElementById('Desencriptar-btn').disabled = true;

    // Limpiar el texto original si se ha modificado después de la desencriptación
    if (textoDesencriptado !== textoOriginal) {
        textoOriginal = '';
    }
}

// Función para copiar el texto al portapapeles
function Copiar() {
    // Obtener el texto del textarea dentro del rectángulo
    const textareaRectangulo = document.querySelector('.rectangle_Textarea');

    // Seleccionar el texto del textarea
    textareaRectangulo.select();
    textareaRectangulo.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el texto al portapapeles usando la API moderna
    navigator.clipboard.writeText(textareaRectangulo.value)
        .then(() => {
            console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}

// Asignar la función Copiar al botón
document.getElementById('Copiar-btn').addEventListener('click', Copiar);

