document.addEventListener("DOMContentLoaded", function () {
    const numColumn = 5;
    // array de 20 palabras de 5 letras cada una
    let arrayPalabras = ["hacer", "lugar", "poder", "estar", "tener", "decir", "serio", "razón", "pazos", "correr", "saber", "pista", "amigo", "mismo", "haber", "darle", "trigo", "añoso", "clave", "fiesta"];
    let numeroPalabra = Math.floor(Math.random() * arrayPalabras.length);
    let palabra = arrayPalabras[numeroPalabra];
    console.log(palabra);
    // Div principal
    const div = document.createElement("div");
    div.id = ("contenedor");
    div.style.width = "350px";
    div.style.border = "1px solid black";
    div.style.margin = "0 auto";
    div.style.borderRadius = "2%"
    div.style.marginTop = "10px";
    div.style.padding = "10px";

    let fila1;
    let fila2;
    let fila3;
    let fila4;
    let fila5;
    let fila6;
    let divVacios;

    rellenarFilas(fila1, 1);
    rellenarFilas(fila2, 1);
    rellenarFilas(fila3, 3);
    rellenarFilas(fila4, 4);
    rellenarFilas(fila5, 5);
    rellenarFilas(fila6, 6);

    //creamos filas y rellenamos con divs vacios en función de numColumn
    function rellenarFilas(fila, numfila) {
        fila = document.createElement("div");
        fila.style.display = "flex";
        fila.dataset.enviada = "false";
        fila.style.justifyContent = "space-around";
        fila.style.gap = "10px";
        fila.style.marginBottom = "10px";

        for (let index = 0; index < numColumn; index++) {
            divVacios = document.createElement("div");
            divVacios.style.maxWidth = "35px";
            divVacios.style.minWidth = "30px";
            divVacios.style.minHeight = "30px";
            divVacios.style.textAlign = "center";
            divVacios.style.border = "1px solid black";
            divVacios.className = "escribir";
            fila.appendChild(divVacios);
        }
        div.appendChild(fila);
    }

    document.body.appendChild(div);
    const letrasTeclado = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ",
        "Enviar", "Z", "X", "C", "V", "B", "N", "M", "⌫"];

    // div principal del teclado
    const teclado = document.createElement("div");
    teclado.style.border = "1px solid black";
    teclado.style.padding = "15px";
    teclado.style.borderRadius = "5px";
    teclado.style.margin = "0 auto";
    teclado.style.width = "700px";
    teclado.style.display = "grid";
    teclado.style.gridAutoFlow = "row";
    teclado.style.justifyItems = "center";
    teclado.style.gridTemplateColumns = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr";
    teclado.style.gap = "7px";
    teclado.style.marginTop = "130px";

    let boton;
    //bucle para crear los botones del teclado
    for (let index = 0; index < letrasTeclado.length; index++) {
        boton = document.createElement("button");
        boton.style.textAlign = "center";
        boton.style.padding = "12px";
        boton.style.maxWidth = "60px";
        boton.style.minHeight = "30px";
        boton.style.textAlign = "center";
        boton.style.border = "1px solid black";
        boton.innerHTML = letrasTeclado[index];
        if (letrasTeclado[index] === "Enviar") {
            boton.style.gridColumn = "1/2";
        }
        if (letrasTeclado[index] === "⌫") {
            boton.style.gridColumn = "span 2";
            boton.style.minWidth = "80px";
        }
        teclado.appendChild(boton);
    }

    document.body.appendChild(teclado);

    arrayEscribir = document.querySelectorAll(".escribir");

    let fila = 1;
    let index = 1;
    let solucionFila = "";

    teclado.addEventListener("click", clickTeclado);

    function clickTeclado(event) {
        let tecla = event.target;
        if (tecla.tagName != "BUTTON") return;

        let divEscribir = document.querySelector(`div>div:nth-child(${fila})>div:nth-child(${index})`);

        if (tecla.innerHTML === "⌫") {
            if (index == 1 && fila > 7) {
                let divBorrar = document.querySelector(`div>div:nth-child(${fila})>div:nth-child(${index})`);
                divBorrar.innerHTML = "";
                solucionFila = solucionFila.substring(0, solucionFila.length -1);
            }
            else if(index > 1 && fila < 7){
                let divBorrar = document.querySelector(`div>div:nth-child(${fila})>div:nth-child(${index -1})`);
                divBorrar.innerHTML = "";
                solucionFila = solucionFila.substring(0, solucionFila.length -1);
                index--;
            }
        }
        else if(tecla.innerHTML === "Enviar"){
            if (solucionFila.length == 5 && fila < 7 ) {
                comprobarPalabra(solucionFila.toLowerCase(),fila);
                index = 1;
                fila++;
                solucionFila = ""; //Aquí habría que comprobar la palabra;
            }
        }
        else{
            if (index <= 5 && fila < 7) {
                divEscribir.innerHTML = tecla.innerHTML;
                solucionFila += tecla.innerHTML;
                console.log(solucionFila);
                index++;
            }
        }
    }

    function comprobarPalabra(solucionFila, fila) {
        let divFila = document.querySelector(`#contenedor>div:nth-child(${fila})`);
        if(solucionFila == palabra){
            for (const index of divFila.children) {
                index.style.backgroundColor = "green";
            }
            teclado.removeEventListener("click", clickTeclado);
        }
        else{
            solucionFila.split("").forEach((letra, index) => {
                if(letra != palabra[index]){
                    if(palabra.includes(letra)){
                        divFila.children[index].style.backgroundColor = "yellow";
                        
                    }
                    else{
                        divFila.children[index].style.backgroundColor = "red";
                    }
                }
                else{
                    divFila.children[index].style.backgroundColor = "green";
                }
            });
        }
    };
});