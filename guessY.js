let titulo = document.querySelector('#titulo')
    let imagen = document.querySelector('#imagen')
    let boton = document.querySelector('#boton')
    let verificar = document.querySelector('#verificar')
    let respuesta = document.querySelector('#respuesta')
    let resultado = document.querySelector('#resultado')

    let fechasMostradas = []
    let añoCorrecto = "" 

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
        } while (fechasMostradas.includes(fechaStr)) 

        return fechaStr
    }

    function obtenerImagen() {
        const fechaRandom = fechaAleatoria()

        fetch(`https://api.nasa.gov/planetary/apod?api_key=ZsMXsJQczfnsYNTfVeHnUedrKpwJw829HKQyb8Mb&date=${fechaRandom}`)
            .then(respuesta => respuesta.json())
            .then(datos => {
                if (datos.media_type === "image") {
                    fechasMostradas.push(datos.date)

                    titulo.textContent = datos.title
                    imagen.src = datos.url
                    imagen.style.display = "block"

                  
                    añoCorrecto = datos.date.split("-")[0]

                    resultado.textContent = "" 
                    respuesta.value = ""       
                } else {
                    obtenerImagen()
                }
            })
            .catch(error => console.error('Error al obtener datos de la NASA:', error))
    }

    boton.onclick = obtenerImagen

    verificar.onclick = function() {
        let respuestaUsuario = parseInt(respuesta.value.trim(), 10)

        if (!isNaN(respuestaUsuario) && 
            Math.abs(respuestaUsuario - parseInt(añoCorrecto, 10)) <= 5) {
            
            resultado.textContent = "✅ ¡Correcto!"
            resultado.style.color = "green"
        } else {
            resultado.textContent = `❌ Incorrecto. El año era: ${añoCorrecto}`
            resultado.style.color = "red"
        }
    }