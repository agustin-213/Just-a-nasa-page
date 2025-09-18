let titulo = document.querySelector('#titulo')
let fecha = document.querySelector('#fecha')
let imagen = document.querySelector('#imagen')
let boton = document.querySelector('#boton')

let fechasMostradas = []

function fechaAleatoria() {
    const inicio = new Date(1995, 5, 16).getTime() 
    const hoy = new Date().getTime()
    let aleatoria, yyyy, mm, dd, fechaStr

    do {
        aleatoria = new Date(inicio + Math.random() * (hoy - inicio))
        yyyy = aleatoria.getFullYear()
        mm = String(aleatoria.getMonth() + 1).padStart(2, '0')
        dd = String(aleatoria.getDate()).padStart(2, '0')
        fechaStr = `${yyyy}-${mm}-${dd}`
    } while (fechasMostradas.includes(fechaStr)) // Evita repetir fechas

    return fechaStr
}

function obtenerImagen() {
    const fechaRandom = fechaAleatoria()

    fetch(`https://api.nasa.gov/planetary/apod?api_key=ZsMXsJQczfnsYNTfVeHnUedrKpwJw829HKQyb8Mb&date=${fechaRandom}`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);  // Verifica toda la respuesta

            if (datos.media_type === "image") {
                fechasMostradas.push(datos.date)

                titulo.textContent = datos.title
                fecha.textContent = datos.date
                console.log('URL de la imagen:', datos.url);  // Verifica la URL de la imagen

                imagen.src = datos.url;

                imagen.onload = function() {
                    console.log('Imagen cargada con éxito');
                };

                imagen.onerror = function() {
                    console.log('Error al cargar la imagen');
                };
                
                imagen.style.display = "block"; // Asegura que la imagen se muestre correctamente
            } else {
                console.log('No es una imagen, buscando otra...');
                obtenerImagen(); // Intenta obtener una imagen de nuevo
            }
        })
        .catch(error => console.error('Error al obtener datos de la NASA:', error))
}

boton.onclick = function() {
    obtenerImagen()
}
