//constructores

function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}


function UI() { }

//llena las opciones de los años

UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const year = document.querySelector('#year');
    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
};


UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mesaje', 'mt-10');
    div.textContent = mensaje;
    const formulario = document.querySelector('#cotizar-seguro');

    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
}


UI.prototype.mostrarResusltado = (total, seguro) => {
    const { marca, tipo, year } = seguro;
    let textMarca;
    switch (marca) {
        case '1':
            textMarca = 'Americano'
            break;
        case '2':
            textMarca = 'Asiatico'
            break;
        case '3':
            textMarca = 'Europeo'
        default:
            break;

    }
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class="heaader font-bold"> Tu resumen</p>
    <p class="font-bold">Marca: <spam class="font-normal">${textMarca}</spam></p>
    <p class="font-bold">Año: <spam class="font-normal">${year}</spam></p>
    <p class="font-bold">Tipo de Seguro: <spam class="font-normal">${tipo}</spam></p>
    <p class="font-bold">Total: ${total}</p>
    `;
    const restltdoDiv = document.querySelector('#resultado');

    const spiner = document.querySelector('#cargando');
    spiner.style.display = 'block';

    setTimeout(() => {
        spiner.style.display = 'none';
        restltdoDiv.appendChild(div);
    }, 2000);

}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();

});


evenListenners();

function evenListenners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', (cotizarSeguro));
}

function cotizarSeguro(event) {
    event.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los Campos son obligatorios', 'error');
    } else {
        ui.mostrarMensaje('Cotizando...', 'exito');
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }

        const seguro = new Seguro(marca, year, tipo);
        const total = seguro.cotizarSeguro();

        ui.mostrarResusltado(total, seguro);

    }

}